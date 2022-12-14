import { defineStore } from 'pinia'
import { CRYPTO_CURRENCYS } from '@/data/data'
import type { BalancesFlattened } from '@/types/types'
import BalancesService from '@/services/BalancesService'

export const useBalanceStore = defineStore('BalanceStore', {
  state: () => ({
    response: {},
    accounts: [] as Array<String>,
    balances: [] as Array<BalancesFlattened>,
    balancesSum: [] as Array<BalancesFlattened>,
    balancesForAccount: [] as Array<BalancesFlattened>,
    sum: 0
  }),
  getters: {
    getAccounts () {
      this.accounts = Object.keys(this.response)
    },
    getSum () {
      this.sum = this.balances.reduce(
        (acc, curr) => acc + parseInt(curr.usd_value),
        0
      )
    },
    getAllBalances () {
      const temp = [] as Array<BalancesFlattened>
      this.accounts.map(account => {
        Object.keys(CRYPTO_CURRENCYS).map(currency => {
          this.response[account][currency]?.amount &&
            temp.push({
              account,
              currency,
              amount: this.response[account][currency]?.amount,
              usd_value: this.response[account][currency]?.usd_value
            })
        })
      })

      this.balances = [...temp]
    },
    // getBalancesForAccount: state => {
    //   return (account: string) =>
    //     state.balances.filter(balance => balance.account === account)
    // },
    getEventsForAccount: state => (account: string) => {
      state.balancesForAccount = state.balances.filter(
        balance => balance.account === account
      )
    },
    getOverviewOfAllCurrencies () {
      this.balancesSum = Object.values(
        this.balances.reduce((acc, curr) => {
          if (!acc[curr.currency]) {
            acc[curr.currency] = {
              currency: curr.currency,
              amount: curr.amount,
              usd_value: curr.usd_value,
              percentage: parseInt(curr.usd_value) / this.sum
            }
          } else {
            acc[curr.currency] = {
              currency: curr.currency,
              amount: (
                parseInt(curr.amount) + parseInt(acc[curr.currency].amount)
              ).toString(),
              usd_value: (
                parseInt(curr.usd_value) +
                parseInt(acc[curr.currency].usd_value)
              ).toString(),
              percentage:
                (parseInt(curr.usd_value) +
                  parseInt(acc[curr.currency].usd_value)) /
                this.sum
            }
          }
          return acc
        }, {})
      )
    }
  },
  actions: {
    fetchBalances () {
      return BalancesService.getBalances()
        .then(response => {
          this.response = response
        })
        .catch(error => {
          throw error
        })
    }
  }
})
