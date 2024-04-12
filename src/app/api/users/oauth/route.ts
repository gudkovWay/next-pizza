import clientPromise from '@/shared/lib/mongodb'
import {
  getDbAndReqBody,
  findUserByEmail,
  createUserAndGenerateTokens,
  generateTokens,
} from '@/shared/lib/utils/api-routes'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { db, reqBody } = await getDbAndReqBody(clientPromise, req)
  const user = await findUserByEmail(db, reqBody.email)

  if (!user) {
    const tokens = await createUserAndGenerateTokens(db, reqBody)

    return NextResponse.json(tokens)
  }

  const tokens = generateTokens(user.name, reqBody.email)

  return NextResponse.json(tokens)
}
