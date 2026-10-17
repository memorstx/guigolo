export const QUEUE_KEY = "guigolo:crawlers:queued:v1";
export const PROCESSING_KEY = "guigolo:crawlers:processing:v1";
export type CrawlerRecord = {
  ingest_id: string; seen_at: string; bot_name: string; category: string;
  path: string; query_string: string | null; http_method: string;
  user_agent: string; referrer: string | null; vercel_id: string | null;
};
export function queueConfigured() {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}
export async function redisCommand<T = unknown>(command: (string | number)[]): Promise<T> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) throw new Error("Redis queue not configured");
  const response = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(command), cache: "no-store", signal: AbortSignal.timeout(12000),
  });
  if (!response.ok) throw new Error(`Redis HTTP ${response.status}`);
  const body = (await response.json()) as {result?: T; error?: string};
  if (body.error) throw new Error(body.error);
  return body.result as T;
}
export async function claimBatch(size: number): Promise<string[]> {
  const lua = "local out = {} for i = 1, tonumber(ARGV[1]) do local v = redis.call('RPOPLPUSH', KEYS[1], KEYS[2]); if not v then break end; table.insert(out,v) end return out";
  return (await redisCommand<string[]>(["EVAL",lua,2,QUEUE_KEY,PROCESSING_KEY,size])) ?? [];
}
