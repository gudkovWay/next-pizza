'use client'
import { IUser } from '@/shared/types/user'
import { user, loginCheckFx } from '.'

export const $user = user
  .createStore<IUser>({} as IUser)
  .on(loginCheckFx.done, (_, { result }) => result)
