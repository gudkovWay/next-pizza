import { useEffect } from 'react'

export const usePageTitle = () => {
  useEffect(() => {
    document.title = `${'DoodlePizza'} | Ошалевшая курсовая работа. `
  }, [])
}
