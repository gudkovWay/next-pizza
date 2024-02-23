import { NextResponse } from 'next/server'
import { sendMail } from '@/shared/api/service/mailService'

export async function POST(req: Request) {
  const res = await req.json()
  try {
    await sendMail(
      'DoodlePizza',
      res.email,
      `Ваши данные для входа - пароль: ${res.password}, логин: ${res.email}`
    )
    return NextResponse.json({ message: 'Success' })
  } catch (err) {
    return NextResponse.json({ message: (err as Error).message })
  }
}
