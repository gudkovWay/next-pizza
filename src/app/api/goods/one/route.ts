import { NextResponse } from 'next/server'

import clientPromise from '@/shared/lib/mongodb'
import { getDbAndReqBody } from '@/shared/lib/utils/api-routes'

export async function POST(req: Request) {
  try {
    const { db, reqBody } = await getDbAndReqBody(clientPromise, req)

    const productItem = await db
      .collection(reqBody.category)
      .findOne({ slug: reqBody.productId })

    if (!productItem) {
      return NextResponse.json({
        message: 'Product not found',
        status: 404,
      })
    }

    return NextResponse.json({ status: 200, productItem })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
