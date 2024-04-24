import clientPromise from '@/shared/lib/mongodb'
import { getDataFromDBByCollection } from '@/shared/lib/utils/api-routes'

export async function GET(req: Request) {
  try {
    return getDataFromDBByCollection(clientPromise, req, 'favorites')
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
