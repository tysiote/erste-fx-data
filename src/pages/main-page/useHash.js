import { useEffect, useState, useCallback } from 'react'
import { stripHashtagFromHash } from './utils'

export const useHash = () => {
  const [hash, setHash] = useState(() => stripHashtagFromHash(window.location.hash))

  const handleOnHashChange = useCallback(() => {
    setHash(stripHashtagFromHash(window.location.hash))
  }, [])

  useEffect(() => {
    window.addEventListener('hashchange', handleOnHashChange)

    return () => {
      window.removeEventListener('hashchange', handleOnHashChange)
    }
  }, [])

  const updateHash = useCallback(
    (newHash) => {
      if (newHash !== hash) {
        window.location.hash = newHash
      }
    },
    [hash]
  )

  return [hash, updateHash]
}
