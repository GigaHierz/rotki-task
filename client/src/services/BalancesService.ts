import { client } from '../../utils/client'

export default {
  getBalances () {
    return client('balances').then(data => {
      return data.result
    })
  }
}
