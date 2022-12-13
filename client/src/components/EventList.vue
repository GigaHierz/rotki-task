<script setup lang="ts">
import ListTemplate from "./ListTemplate.vue";
import { eventsTitles, CRYPTO_CURRENCYS } from "../data/data";
import {
  Account,
  Currency,
  AssetInfo,
  TransactionEvents,
} from "../types/types";
import { useEventStore } from "../stores/EventStore";
import { client } from "../../utils/client";

const props = defineProps({
  events: { required: true, type: String },
});

const eventStore = useEventStore();
const eventTitles = eventsTitles;
</script>

<template>
  <list-template :titles="eventTitles" />
  {{ eventStore.events }}

  <!-- <list-template :titles="[eventList[0].event_type]" /> -->
</template>
