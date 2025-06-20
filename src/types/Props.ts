interface SearchParams {
  [key: string]: string | string[] | undefined
}

export interface Props<
  P extends Record<string, unknown> = Record<string, unknown>,
  S extends SearchParams = SearchParams,
> {
  params: Promise<P & { locale: string }>
  searchParams: Promise<S>
}
