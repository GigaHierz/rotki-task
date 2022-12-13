import { defineStore } from 'pinia'

export const useBalanceStore = defineStore('BalanceStore', {
  state: () => ({
    events: [],
    event: {}
  })
})
