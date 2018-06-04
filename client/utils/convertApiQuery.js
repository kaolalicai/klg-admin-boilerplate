export default function (query) {
  const params = {
    ...query,
    page: query.page || 1,
    limit: query.limit || 10
  }

  return params
}
