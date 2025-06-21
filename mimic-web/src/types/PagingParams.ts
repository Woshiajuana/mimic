export type PagingParams<T = unknown> = {
  pageIndex: number
  pageSize: number
} & T
