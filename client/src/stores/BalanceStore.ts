import { defineStore } from 'pinia'

export const useBalanceStore = defineStore('BalanceStore', {
  state: () => ({
    response: {},
    accounts: [],
    balances: []
  }),
  getters: {
    getAccounts () {
      this.accounts = Object.keys(this.response)
    },
    getBalances () {}
  },
  actions: {
    fetchBalances () {
      return BalanceStore.getBalances()
        .then(response => {
          console.log(response)

          this.response = response
        })
        .catch(error => {
          throw error
        })
    }
  }
})
