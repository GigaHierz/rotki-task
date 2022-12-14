<script setup lang="ts">
import ListTemplate from "./ListTemplate.vue";
import { eventsTitles, CRYPTO_CURRENCYS } from "../data/data";

const props = defineProps({
  events: { required: true, type: String },
});

const eventTitles = eventsTitles;
</script>

<template>
  <list-template :titles="eventTitles" />

  <!-- <list-template :titles="[eventList[0].event_type]" /> -->
</template>
