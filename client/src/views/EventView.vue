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
  computed: {
    events() {
      return this.$store.state.events;
    },
  },
};
</script>

<template>
  <EventList :events="hallloo" />

  {{ eventStore.events }}
  {{ eventStore.getEvents }}

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
