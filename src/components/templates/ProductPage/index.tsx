'use client'
import { notFound } from 'next/navigation'
import { useEffect } from 'react'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useUnit } from 'effector-react'

import ProductPageContent from '@/components/modules/ProductPage/ProductPageContent'
import { loadOneProduct, loadOneProductFx } from '@/features/context/goods'
import { $currentProduct } from '@/features/context/goods/state'
import { IProductPageProps } from '@/shared/types/product'
import styles from '@/app/styles/product/index.module.scss'

const ProductPage = ({ productId, category }: IProductPageProps) => {
  const product = useUnit($currentProduct)
  const productSpinner = useUnit(loadOneProductFx.pending)

  useEffect(() => {
    loadOneProduct({
      productId,
      category,
    })
  }, [productId, category])

  if (product?.errorMessage) {
    notFound()
  }

  return (
    <div className={styles.product}>
      {productSpinner ? (
        <div className={styles.product__preloader}>
          <FontAwesomeIcon icon={faSpinner} spin size='8x' />
        </div>
      ) : (
        product.name && <ProductPageContent />
      )}
    </div>
  )
}

export default ProductPage
