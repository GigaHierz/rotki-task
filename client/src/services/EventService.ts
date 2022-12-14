import type { Account } from '@/types/types'
import { client } from '../../utils/client'

export default {
  async getEvents () {
    return await client('events').then((data: { result: Account }) => {
      return data.result
    })
  }
}
