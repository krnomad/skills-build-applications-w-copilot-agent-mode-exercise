import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const apiOrigin = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function apiUrl(resource) {
  return `${apiOrigin}/api/${resource}/`
}

function collectionFrom(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  return []
}

export function useApiCollection(resource, endpoint = apiUrl(resource)) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function loadCollection() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(endpoint)
        if (!response.ok) {
          throw new Error(`Request failed (${response.status})`)
        }

        const payload = await response.json()
        if (active) setItems(collectionFrom(payload))
      } catch (requestError) {
        if (active) setError(requestError.message || 'Unable to load data.')
      } finally {
        if (active) setLoading(false)
      }
    }

    loadCollection()
    return () => {
      active = false
    }
  }, [endpoint, resource])

  return { items, loading, error }
}