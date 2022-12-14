import type { TransactionEventFlattend } from '@/types/types'
import { defineStore } from 'pinia'
import EventService from '../services/EventService'

export const useEventStore = defineStore('EventStore', {
  state: () => ({
    response: {},
    accounts: [] as Array<String>,
    events: [] as Array<TransactionEventFlattend>,
    eventsForAccount: [] as Array<TransactionEventFlattend>
  }),
  getters: {
    getAccounts () {
      this.accounts = Object.keys(this.response)
    },
    numberofEvents (account?: string) {
      account
        ? this.events?.filter(event => event?.account === account).length
        : this.events.length
    },
    getEvents () {
      const temp = [] as Array<TransactionEventFlattend>

      this.accounts.map(account => {
        this.response[account].events.map(event => {
          temp.push({
            account,
            event_type: event.event_type,
            asset: event.asset,
            amount: event.value.amount,
            usd_value: event.value.usd_value,
            timestamp: event.timestamp
          })
        })
      })

      this.events = [...temp]
    },
    getEventsForAccount: state => (account: string) => {
      state.eventsForAccount = state.events.filter(
        event => event.account === account
      )
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
