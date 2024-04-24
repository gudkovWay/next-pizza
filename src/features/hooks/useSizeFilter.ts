import { useUnit } from 'effector-react'
import { useEffect } from 'react'
import {
  $sizesOptions,
  $sizes,
  setSizesOptions,
  setSizes,
  updateSizesOptionBySize,
} from '@/features/context/catalog'
import {
  getCheckedArrayParam,
  getSearchParamsUrl,
} from '@/shared/lib/utils/common'

export const useSizeFilter = (
  handleApplyFiltersWithSizes: (arg0: string[]) => void
) => {
  const sizesOptions = useUnit($sizesOptions)
  const sizes = useUnit($sizes)

  const applySizes = (sizes: string[]) => {
    handleApplyFiltersWithSizes(sizes)
    setSizes(sizes)
  }

  const handleSelectSize = (id: number) => {
    const updatedOptions = sizesOptions.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    )

    setSizesOptions(updatedOptions)

    const currentOption = updatedOptions.find((item) => item.id === id)

    if (currentOption && currentOption.checked) {
      applySizes([...sizes, currentOption.size])
      return
    }

    applySizes(sizes.filter((size) => size !== currentOption?.size))
  }

  useEffect(() => {
    const urlParams = getSearchParamsUrl()
    const sizesParam = urlParams.get('sizes')

    if (sizesParam) {
      const validSizes = getCheckedArrayParam(sizesParam)

      if (validSizes) {
        applySizes(validSizes)
        validSizes.forEach((size) => updateSizesOptionBySize(size))
      }

      return
    }

    setSizes([])
    setSizesOptions(
      sizesOptions.map((option) => ({ ...option, checked: false }))
    )
  }, [])

  return { handleSelectSize, sizesOptions, sizes }
}
