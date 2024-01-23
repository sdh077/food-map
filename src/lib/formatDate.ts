export function formatDate(dateString: string) {
  let parts = dateString.split('+')
  let hasDay = parts.length > 2

  return new Date(`${parts.length > 1 ? parts[0] : dateString}Z`).toLocaleDateString('ko-KR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
