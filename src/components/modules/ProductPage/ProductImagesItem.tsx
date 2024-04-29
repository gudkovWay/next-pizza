import Image from 'next/image'

import useImagePreloader from '@/features/hooks/useImagePreloader'
import { IProductImagesItemProps } from '@/shared/types/product'
import styles from '@/styles/product/index.module.scss'

const ProductImagesItem = ({ image, imgSize }: IProductImagesItemProps) => {
  const { handleLoadingImageComplete, imgSpinner } = useImagePreloader()

  return (
    <li
      className={`${styles.product__top__images__item} ${
        imgSpinner ? styles.img_loading : ''
      }`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        width={imgSize}
        height={imgSize}
        className='transition-opacity opacity-0 duration'
        onLoad={handleLoadingImageComplete}
      />
    </li>
  )
}

export default ProductImagesItem
