import { defineStore } from 'pinia'
// import { TransactionEvents } from '@/types/types'
import EventService from '../services/EventService'

export const useEventStore = defineStore('EventStore', {
  state: () => ({
    user: 'Lena HIerzi',
    events: [],
    event: {}
  }),
  getters: {
    firstName () {
      return this.user.split(' ')[0]
    },
    numberofEvents: state => state.events?.length
  },
  actions: {
    fetchEvents () {
      return EventService.getEvents()
        .then(response => {
          this.events = response.data
        })
        .catch(error => {
          throw error
        })
    }
  }
})
