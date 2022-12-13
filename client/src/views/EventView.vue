<script setup lang="ts">
import EventList from "../components/EventList.vue";
import { client } from "../../utils/client";
import { TransactionEvents } from "../types/types";

let userData: Array<TransactionEvents>;

const fetchData = async () => {
  await client("events").then((data) => {
    console.log(data);
    userData = data.events?.result;
  });
};

fetchData();
</script>

<template>
  <EventList :events="userData" />
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
