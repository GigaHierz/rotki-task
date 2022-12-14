<script lang="ts">
import EventList from "../components/EventList.vue";
import { useEventStore } from "../stores/EventStore";

export default {
  setup() {
    const eventStore = useEventStore();
    return {
      eventStore,
    };
  },
  created() {
    this.eventStore.fetchEvents().catch((error) => {
      this.$router.push({
        name: "ErrorDisplay",
        params: { error: error },
      });
    });
  },
};
</script>

<template>
  <!-- <EventList :events="hallloo" /> -->

  <main>
    <div>
      <p>Wallet: {{ selected }}</p>
      <select v-model="selected">
        <option v-for="(account, index) in eventStore.accounts" :key="index">
          {{ account }}
        </option>
      </select>
    </div>

    <ul>
      <li v-for="(event, index) in eventStore.events" :key="index">
        Event Type: {{ event.event_type }}, Asset: {{ event.asset }}, Value:
        {{ event.amount }}, USD Value: {{ event.usd_value }}, Time:
        {{ event.timestamp }}, Sender: {{ event.account }}
      </li>
    </ul>
  </main>

  {{ eventStore.getEvents }}
  <!-- {{ eventStore.getEventsForAccount(selected.toString()) }} -->
</template>

<style lang="scss">
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
