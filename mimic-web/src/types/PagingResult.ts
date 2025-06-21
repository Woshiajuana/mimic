export interface PagingResult<T = unknown> {
  total: number
  list: T[]
}
