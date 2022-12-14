import type { Account } from '@/types/types'
import { client } from '../../utils/client'

export default {
  async getBalances () {
    return await client('balances').then((data: { result: Account }) => {
      return data.result
    })
  }
}
