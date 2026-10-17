import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";
import { claimBatch, PROCESSING_KEY, QUEUE_KEY, queueConfigured, redisCommand, type CrawlerRecord } from "@/lib/crawlerQueue";

export const runtime = "nodejs";
export const maxDuration = 60;
const BATCH_SIZE = 100;
const MAX_BATCHES = 30;
const LOCK_KEY = "guigolo:crawlers:flush-lock:v1";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ok: false}, {status: 401});
  }
  if (!queueConfigured() || !process.env.DATABASE_URL) {
    return NextResponse.json({ok: false, error: "Redis/Neon configuration missing"}, {status: 503});
  }
  const lockToken = crypto.randomUUID();
  let acquired: string | null;
  try {
    acquired = await redisCommand<string | null>(["SET",LOCK_KEY,lockToken,"NX","EX",180]);
  } catch (error) {
    console.error("Crawler flush lock unavailable", error);
    return NextResponse.json({ok: false}, {status: 503});
  }
  if (acquired !== "OK") return NextResponse.json({ok: false, error:"Flush in progress"}, {status: 409});
  const sql = neon(process.env.DATABASE_URL);
  let processed = 0;
  try {
    for (let batch = 0; batch < MAX_BATCHES; batch++) {
      let messages = (await redisCommand<string[]>(["LRANGE",PROCESSING_KEY,0,BATCH_SIZE-1])) ?? [];
      if (!messages.length) messages = await claimBatch(BATCH_SIZE);
      if (!messages.length) break;
      const records = messages.map(item => JSON.parse(item) as CrawlerRecord);
      await sql.query(`
        INSERT INTO crawler_events
          (ingest_id, seen_at, bot_name, category, path, query_string, http_method, user_agent, referrer, vercel_id)
        SELECT ingest_id, seen_at, bot_name, category, path, query_string,
               http_method, user_agent, referrer, vercel_id
        FROM jsonb_to_recordset($1::jsonb) AS r(
          ingest_id text, seen_at timestamptz, bot_name text, category text,
          path text, query_string text, http_method text, user_agent text,
          referrer text, vercel_id text
        )
        ON CONFLICT (ingest_id) DO NOTHING
      `, [JSON.stringify(records)]);
      const ack = "for i = 1, #ARGV do redis.call('LREM', KEYS[1], 1, ARGV[i]) end return #ARGV";
      await redisCommand(["EVAL",ack,1,PROCESSING_KEY,...messages]);
      processed += messages.length;
    }
    const queued = await redisCommand<number>(["LLEN",QUEUE_KEY]);
    const processing = await redisCommand<number>(["LLEN",PROCESSING_KEY]);
    return NextResponse.json({ok: true, processed, queued, processing});
  } catch (error) {
    console.error("Crawler flush failed; events retained for retry",error);
    return NextResponse.json({ok: false, processed}, {status: 503});
  } finally {
    const release = "if redis.call('GET', KEYS[1]) == ARGV[1] then return redis.call('DEL',KEYS[1]) end return 0";
    try { await redisCommand(["EVAL",release,1,LOCK_KEY,lockToken]); }
    catch(error) { console.error("Failed to release crawler lock",error); }
  }
}
