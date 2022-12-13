<script setup lang="ts">
import ListTemplate from "./ListTemplate.vue";
import { eventsTitles } from "../data/data";
import { TransactionEvents } from "../types/types";
const props = defineProps({
  events: { required: true, type: Array<TransactionEvents> },
});

const eventTitles = eventsTitles;

const iterate = (obj) => {
  console.log(obj);

  Object?.keys(obj).forEach((key) => {
    console.log(`key: ${key}, value: ${obj[key]}`);

    if (typeof obj[key] === "object" && obj[key] !== null) {
      iterate(obj[key]);
    }
  });
};
// console.log(props && props.events);

// iterate(props && props.events);
</script>

<template>
  <list-template :titles="eventTitles" />
  <!-- <list-template :titles="[eventList[0].event_type]" /> -->
</template>
