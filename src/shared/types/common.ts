import { StoreWritable } from 'effector'

export interface IProduct {
  _id: string
  category: string
  price: number
  name: string
  description: string
  characteristics: ICharacteristics
  images: string[]
  vendorCode: string
  slug: string
  weight: number
  popularity: number
  inStock: boolean
  isBestseller: boolean
  isNew: boolean
  sizes: ISizes
}

export interface ISizes {
  26: number
  30: number
  36: number
}

export interface ICharacteristics {
  name: string
  category: string
  compositions: string[]
  collection: string
  dough: string
}

export interface ISelectedSizes {
  className?: string
}

export interface IBaseEffectProps {
  jwt: string
  id: string
  setSpinner: (arg0: boolean) => void
}

export type UseGoodsByAuth<T> = StoreWritable<T>
