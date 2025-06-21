import { type PagingParams, type PagingResult } from '@camomile.js/sdk'

import type { User } from '@/types'

import { proxy } from './proxy'

export const reqUserList = (data: PagingParams) => proxy<PagingResult<User>>(`/v1/user`, data)

export const doUserUpdate = (data: Partial<User>) =>
  proxy(`/v1/user/{userId}`, data, {
    method: 'PATCH',
  })
