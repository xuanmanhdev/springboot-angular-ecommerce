export interface QueryParamsListing {
  page: number,
  size: number,
  q?: string, // meaning ? option property
  sort?: string[] // meaning ? option property
}
