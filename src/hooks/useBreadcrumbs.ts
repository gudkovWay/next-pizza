import { useCallback, useEffect } from 'react'
import { useCrumbText } from './useCrumbText'
import { usePageTitle } from './usePageTitle'

export const useBreadcrumbs = (page: string) => {
  const { crumbText } = useCrumbText(page)
  const getDefaultTextGenerator = useCallback(() => crumbText, [crumbText])
  const getTextGenerator = useCallback((param: string) => ({})[param], [])
  usePageTitle()

  useEffect(() => {
    const lastCrumb = document.querySelector('.last-crumb') as HTMLElement

    if (lastCrumb) {
      lastCrumb.textContent = crumbText
    }
  }, [crumbText])

  return { getDefaultTextGenerator, getTextGenerator }
}
