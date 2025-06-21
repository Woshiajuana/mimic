import { __DEV__, curl, type CurlOptions } from '@camomile.js/sdk'

const baseURL = __DEV__ ? 'http://localhost:8401' : 'v1/proxy/request/stx'

export async function proxy<T = any>(url: string, data?: any, options?: CurlOptions): Promise<T> {
  return await curl(`${baseURL}${url}`, data, options)
}
