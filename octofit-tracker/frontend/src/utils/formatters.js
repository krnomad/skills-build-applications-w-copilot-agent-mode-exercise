export function relationName(value) {
  if (value && typeof value === 'object') {
    return value.name || value.username || value._id || '—'
  }
  return value || '—'
}

export function formatDate(value) {
  if (!value) return '—'
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '—' : date.toLocaleDateString()
}