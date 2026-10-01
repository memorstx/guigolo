export const CRAWLER_SESSION_COOKIE = "guigolo_crawler_session";

const REMEMBERED_SESSION_SECONDS = 60 * 60 * 24 * 30;
const SESSION_SECONDS = 60 * 60 * 12;

function toBase64Url(bytes: Uint8Array) {
  let binary = "";

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function fromBase64Url(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(
    normalized.length + ((4 - (normalized.length % 4)) % 4),
    "="
  );
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
}

function encodeText(value: string) {
  return toBase64Url(new TextEncoder().encode(value));
}

function decodeText(value: string) {
  return new TextDecoder().decode(fromBase64Url(value));
}

async function getSigningKey(secret: string) {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

async function sign(payload: string, secret: string) {
  const key = await getSigningKey(secret);
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload)
  );

  return toBase64Url(new Uint8Array(signature));
}

export async function createCrawlerSession(
  username: string,
  secret: string,
  remember: boolean
) {
  const maxAge = remember ? REMEMBERED_SESSION_SECONDS : SESSION_SECONDS;
  const expiresAt = Date.now() + maxAge * 1000;
  const user = encodeText(username);
  const payload = `${user}.${expiresAt}`;
  const signature = await sign(payload, secret);

  return {
    token: `${payload}.${signature}`,
    maxAge: remember ? REMEMBERED_SESSION_SECONDS : undefined,
  };
}

export async function verifyCrawlerSession(
  token: string | undefined,
  expectedUsername: string,
  secret: string
) {
  if (!token) return false;

  const [user, expiresAtRaw, signature] = token.split(".");

  if (!user || !expiresAtRaw || !signature) return false;

  const expiresAt = Number(expiresAtRaw);

  if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) return false;

  let username: string;

  try {
    username = decodeText(user);
  } catch {
    return false;
  }

  if (username !== expectedUsername) return false;

  try {
    const key = await getSigningKey(secret);
    return crypto.subtle.verify(
      "HMAC",
      key,
      fromBase64Url(signature),
      new TextEncoder().encode(`${user}.${expiresAtRaw}`)
    );
  } catch {
    return false;
  }
}
