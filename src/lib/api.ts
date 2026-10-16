const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "https://api.fermor.in";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: { code: string; message: string };
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  token?: string,
  isMultipart = false
): Promise<T> {
  // Only set Content-Type: application/json when there's actually a body to send --
  // Fastify's default JSON parser throws "Body cannot be empty when content-type is
  // set to 'application/json'" on a bodyless POST (e.g. a trigger-only action like
  // "run this agent") if the header claims JSON is coming and none arrives.
  const hasBody = options.body !== undefined && options.body !== null;
  const headers: Record<string, string> = {
    ...(isMultipart || !hasBody ? {} : { "Content-Type": "application/json" }),
    ...(options.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const json: ApiResponse<T> = await res.json();

  if (!json.success || !res.ok) {
    throw new Error(json.error?.message ?? "Request failed");
  }
  return json.data;
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("ca_token");
}

export function setToken(token: string) {
  localStorage.setItem("ca_token", token);
}

export function clearToken() {
  localStorage.removeItem("ca_token");
}

export function getOpsToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("ops_token");
}

export function setOpsToken(token: string) {
  localStorage.setItem("ops_token", token);
}

export function clearOpsToken() {
  localStorage.removeItem("ops_token");
}
