import type { NextRequest } from 'next/server';

export const COOKIE_NAME = 'ab_admin';

function getSecret(): string {
  return process.env.ADMIN_SESSION_SECRET ?? 'dev-only-secret-set-in-production';
}

async function hmacKey(usage: KeyUsage[]): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(getSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    usage
  );
}

function toHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

function hexEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function createSessionToken(): Promise<string> {
  const nonce = new Uint8Array(32);
  crypto.getRandomValues(nonce);
  const nonceHex = toHex(nonce.buffer as ArrayBuffer);
  const key = await hmacKey(['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(nonceHex));
  return `${nonceHex}.${toHex(sig)}`;
}

export async function verifySessionToken(token: string): Promise<boolean> {
  try {
    const dot = token.lastIndexOf('.');
    if (dot === -1) return false;
    const nonceHex = token.slice(0, dot);
    const sigHex = token.slice(dot + 1);
    const key = await hmacKey(['sign']);
    const expected = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(nonceHex));
    return hexEqual(sigHex, toHex(expected));
  } catch {
    return false;
  }
}

export async function isAdminRequest(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifySessionToken(token);
}
