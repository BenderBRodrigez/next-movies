export type PagingInput = {
  page: number;
  limit: number;
};

export function getPagingQuery(paging: PagingInput) {
  return {
    skip: (paging.page - 1) * paging.limit,
    take: paging.limit,
  };
}
