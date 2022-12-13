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
  <EventList :events="hallloo" />

  {{ eventStore.events }}
  {{ eventStore.getEvents }}
  {{
    eventStore.getEventsForAccount("0xABC11a5aCc3ad66025C21f24a91dD71D0Fc28a46")
  }}

  <!-- {{ userData.eventStore.user }} -->
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
