const ACCESS_TOKEN_KEY = "access_token";

export type ApiError = {
  message: string;
  status?: number;
};

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setAccessToken(token: string) {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export function clearAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

export function isLoggedIn(): boolean {
  return Boolean(getAccessToken());
}

export const API_BASE_URL = "http://localhost:3000";

async function parseError(res: Response): Promise<ApiError> {
  const status = res.status;
  const contentType = res.headers.get("content-type") ?? "";
  try {
    if (contentType.includes("application/json")) {
      const data = (await res.json()) as unknown;
      if (data && typeof data === "object" && "message" in data) {
        const messageValue = (data as { message?: unknown }).message;
        if (typeof messageValue === "string")
          return { message: messageValue, status };
        if (Array.isArray(messageValue))
          return { message: messageValue.join("\n"), status };
      }
      return { message: JSON.stringify(data), status };
    }
    const text = await res.text();
    return { message: text || res.statusText, status };
  } catch {
    return { message: res.statusText || "Request failed", status };
  }
}

export async function apiFetch<TResponse>(
  path: string,
  options: RequestInit = {},
): Promise<TResponse> {
  const url = path.startsWith("http") ? path : `${API_BASE_URL}${path}`;

  const headers = new Headers(options.headers);
  headers.set("accept", "application/json");

  const token = getAccessToken();
  if (token) headers.set("authorization", `Bearer ${token}`);

  const res = await fetch(url, { ...options, headers });
  if (!res.ok) throw await parseError(res);

  const contentType = res.headers.get("content-type") ?? "";
  if (contentType.includes("application/json"))
    return (await res.json()) as TResponse;

  const text = await res.text();
  return text as TResponse;
}
