import { ICartItem } from './cart'
import { IProduct } from './common'

export interface ILoadOneProductFx {
  category: string
  productId?: string
  slug?: string
  setSpinner?: (arg0: boolean) => void
}

export interface IProductSizesItemProps {
  currentSize: [string, boolean]
  selectedSize: string
  setSelectedSize: (arg0: string) => void
  currentCartItems: ICartItem[]
  category: string
}

export interface IProductCounterProps {
  className: string
  count: number
  setCount: (arg0: number) => void
  cartItem: ICartItem
  updateCountAsync: boolean
  initialCount?: number
  totalCount?: number
  increasePrice?: VoidFunction
  decreasePrice?: VoidFunction
}

export interface IAddToCartBtnProps {
  handleAddToCart: VoidFunction
  addToCartSpinner: boolean
  text: string
  btnDisabled?: boolean
  className?: string
}

export interface IProductCountBySizeProps {
  products: ICartItem[]
  size: string
  withCartIcon?: boolean
}

export interface ILoadProductsByFilterFx {
  limit: number
  offset: number
  category: string
  additionalParam?: string
  isCatalog?: boolean
}

export interface IProducts {
  count: number
  items: IProduct[]
}

export interface ILoadWatchedProductsFx {
  payload: { _id: string; category: string }[]
}
