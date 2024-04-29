import { ObjectId } from 'mongodb'
import { NextResponse } from 'next/server'

import clientPromise from '@/shared/lib/mongodb'
import { getDbAndReqBody } from '@/shared/lib/utils/api-routes'

export async function POST(req: Request) {
  try {
    const { db, reqBody } = await getDbAndReqBody(clientPromise, req)
    const isValidId = ObjectId.isValid(reqBody.productId)

    if (!isValidId) {
      return NextResponse.json({
        message: 'Wrong product id',
        status: 404,
      })
    }

    const productItem = await db
      .collection(reqBody.category)
      .findOne({ _id: new ObjectId(reqBody.productId) })

    return NextResponse.json({ status: 200, productItem })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
