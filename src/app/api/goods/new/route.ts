import { NextResponse } from 'next/server'
import clientPromise from '@/shared/lib/mongodb'
import {
  getDbAndReqBody,
  getNewAndBestsellerGoods,
} from '@/shared/lib/utils/api-routes'

export async function GET() {
  const { db } = await getDbAndReqBody(clientPromise, null)

  return NextResponse.json(await getNewAndBestsellerGoods(db, 'isNew'))
}
