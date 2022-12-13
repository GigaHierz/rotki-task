<script setup lang="ts">
import EventList from "../components/EventList.vue";
import { useEventStore } from "../stores/EventStore";

const eventStore = useEventStore();

console.log(eventStore.user);

const hallloo = "HAlo";
</script>

<template>
  <EventList :events="hallloo" />
  {{ eventStore.user }}

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
