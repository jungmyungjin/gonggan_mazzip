export function parsePaginationParameters({ page, perPage }) {
  const currentPage = parseInt(page, 10) > 0 ? parseInt(page, 10) : 1;
  const itemsPerPage = parseInt(perPage, 10) > 0 ? parseInt(perPage, 10) : 10;
  return { currentPage, itemsPerPage };
}
