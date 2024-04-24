import { useUnit } from 'effector-react'
import { useEffect, useState } from 'react'
import { $catalogCategoryOptions } from '@/features/context/catalog'
import { getSearchParamsUrl } from '@/shared/lib/utils/common'

export const useCategoryFilter = () => {
  const catalogCategoryOptions = useUnit($catalogCategoryOptions)
  const [option, setOption] = useState('')
  const currentOptions = Object.values(catalogCategoryOptions)[0]
  const allCategoriesTitle = 'Все категории'

  const handleSelectAllCategories = () => setOption(allCategoriesTitle)

  useEffect(() => {
    const urlParams = getSearchParamsUrl()
    const typeParam = urlParams.get('type')

    if (typeParam) {
      setOption(typeParam)
    }
  }, [])

  return {
    handleSelectAllCategories,
    currentOptions,
    option,
    setOption,
    catalogCategoryOptions,
    allCategoriesTitle,
  }
}
