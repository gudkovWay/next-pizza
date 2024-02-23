import { NextResponse } from 'next/server'
import clientPromise from '@/shared/api/lib/mongodb'
import {
  getDbAndReqBody,
  getNewAndBestsellerGoods,
} from '@/shared/api/lib/utils/api-routes'

export async function GET() {
  const { db } = await getDbAndReqBody(clientPromise, null)

  return NextResponse.json(await getNewAndBestsellerGoods(db, 'isBestseller'))
}
