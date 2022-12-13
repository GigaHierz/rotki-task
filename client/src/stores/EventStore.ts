import { defineStore } from 'pinia'
import EventService from '../services/EventService'

export const useEventStore = defineStore('EventStore', {
  state: () => ({
    response: {},
    accounts: [],
    events: []
  }),
  getters: {
    numberofEvents (account?: string) {
      account
        ? this.events.filter(event => event.account === account).length
        : this.events.length
    },
    getAccounts () {
      this.accounts = Object.keys(this.response)
    },
    getEvents () {
      this.accounts.map(account => {
        this.response[account].events.map(event => {
          this.events.push({
            account,
            event_type: event.event_type,
            asset: event.asset,
            amount: event.value.amount,
            usd_value: event.value.usd_value,
            timestamp: event.timestamp
          })
        })
      })
    }
  },
  actions: {
    fetchEvents () {
      return EventService.getEvents()
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
