import clientPromise from '@/shared/lib/mongodb'
import { deleteProduct } from '@/shared/lib/utils/api-routes'

export async function DELETE(req: Request) {
  try {
    return deleteProduct(
      clientPromise,
      req,
      req.url.split('id=')[1],
      'favorites'
    )
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
