import clientPromise from '@/shared/lib/mongodb'
import { replaceProductsInCollection } from '@/shared/lib/utils/api-routes'

export async function POST(req: Request) {
  try {
    return replaceProductsInCollection(clientPromise, req, 'cart')
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
