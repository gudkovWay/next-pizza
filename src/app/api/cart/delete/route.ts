import clientPromise from '@/shared/api/lib/mongodb'
import { deleteProduct } from '@/shared/api/lib/utils/api-routes'

export async function DELETE(req: Request) {
  try {
    return deleteProduct(clientPromise, req, req.url.split('id=')[1], 'cart')
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
