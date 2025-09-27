const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

interface HttpOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT'
  body?: unknown
  headers?: Record<string, string>
}

async function request<T>(
  path: string,
  options: HttpOptions = {}
): Promise<T> {
  const url = `${BASE_URL}${path}`
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  }

  const response = await fetch(url, {
    method: options.method || 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined
  })

  if (!response.ok) {
    const text = await response.text().catch(() => '')
    throw new Error(
      text || `HTTP ${response.status} ${response.statusText}`
    )
  }

  const contentType = response.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    return response.json() as Promise<T>
  }
  // @ts-expect-error generic non-json
  return undefined
}

export function httpGet<T>(path: string): Promise<T> {
  return request<T>(path, { method: 'GET' })
}

export function httpPost<T>(
  path: string,
  body: unknown
): Promise<T> {
  return request<T>(path, { method: 'POST', body })
}

export function httpPatch<T>(
  path: string,
  body: unknown
): Promise<T> {
  return request<T>(path, { method: 'PATCH', body })
}

export function httpPut<T>(
  path: string,
  body: unknown
): Promise<T> {
  return request<T>(path, { method: 'PUT', body })
}

export function httpDelete<T>(path: string): Promise<T> {
  return request<T>(path, { method: 'DELETE' })
}

export { BASE_URL }
