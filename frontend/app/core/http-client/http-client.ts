import { Headers, fetch } from 'cross-fetch'
import qs from 'query-string'

type TFetchOptions = {
  method?: string
  token?: string
  headers?: Record<string, string>
  body?: Record<string, unknown> | string | FormData
}

class HttpClient {
  baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async fetch<T = unknown>(
    uri: string,
    options: TFetchOptions = {},
  ): Promise<{ body: T; status: number; headers?: Record<string, string>; ok: boolean }> {
    const config: Record<string, string | undefined | Headers | Record<string, unknown> | FormData> = {
      method: options.method || 'GET',
      ...additionalConfig(),
    }

    const headers = new Headers(options.headers || {})
    contentDefault(headers, 'application/json')

    if (
      (typeof window !== 'undefined' && options.body && options.body instanceof FormData) ||
      options.method === 'HEAD'
    ) {
      headers.delete('content-type')
    }

    if (options.token) {
      headers.set('Authorization', `Bearer ${options.token}`)
    }

    config.headers = headers

    if (options.body) {
      config.body = headers.get('content-type') === 'application/json' ? JSON.stringify(options.body) : options.body
      config.method = config.method || 'POST'
    }

    const url = `${this.baseUrl}${uri}`

    try {
      const response = await fetch(url, config)

      const isNeedParse =
        response.status !== 206 && contentTypeIs(response.headers, 'application/json') && options.method !== 'HEAD'
      const answer = isNeedParse ? await response.json() : await response.text()

      const responder = {
        ok: response.ok,
        body: answer,
        status: response.status,
        headers: Object.fromEntries(response.headers.entries()),
      }

      if (response.ok) {
        return responder
      }

      throw new Error(`API Layer ${url}`)
    } catch (error) {
      throw error
    }
  }

  getBaseUrl(): string {
    return this.baseUrl
  }
}

const baseUrl = {
  'localhost': 'http://localhost:3001',
  'localhost.com': 'http://localhost.com:3001',
  'staging.binaryx.com': 'https://api-staging.binaryx.com',
  'dev.binaryx.com': 'https://api-dev.binaryx.com',
  'binaryx.com': 'https://api.binaryx.com',
}[typeof window !== 'undefined' ? window.location.hostname : ''] || ''

console.log('baseUrl', baseUrl)

export const httpClient = new HttpClient(baseUrl)

// @ts-ignore
export function queryToString(params): string {
  return '?' + qs.stringify(params || {}, { arrayFormat: 'bracket' })
}

/**
 * Check if content-type JSON
 */
function contentTypeIs(headers: Headers, type: string): boolean {
  return headers.get('content-type')?.includes(type) || false
}

function contentDefault(headers: Headers, type: string): Headers {
  if (!headers.has('content-type')) {
    headers.set('content-type', type)
  }
  return headers
}

function additionalConfig() {
  if (typeof window !== 'undefined') {
    return {
      credentials: 'same-origin',
    }
  }
  return {}
}
