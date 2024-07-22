export function badRequest(message: string) {
  return new Response(message, { status: 400 })
}

export function parseNumberFromUrlParam(
  params: URLSearchParams,
  key: string,
  defaultValue: number,
): number {
  const value = params.get(key)
  if (!value) {
    return defaultValue
  }

  const parsed = parseInt(value, 10)
  if (isNaN(parsed)) {
    return defaultValue
  }

  return parsed
}
