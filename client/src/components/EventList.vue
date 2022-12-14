<script setup lang="ts">
import ListTemplate from "./ListTemplate.vue";
import { eventsTitles, CRYPTO_CURRENCYS } from "../data/data";
import type { TransactionEventFlattend } from "../types/types";

const props = defineProps({
  events: { required: true, type: Array<TransactionEventFlattend> },
});

const eventTitles = eventsTitles;
</script>

<template>
  <list-template :titles="eventTitles" />

  <!-- <list-template :titles="[eventList[0].event_type]" /> -->
</template>
