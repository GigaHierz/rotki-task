<script setup lang="ts">
import ListTemplate from "./ListTemplate.vue";
import { assetsTitles } from "../data/data";
const props = defineProps({
  balances: { required: true, type: Array<String> },
});

const assetTitles = assetsTitles;
</script>

<template>
  <list-template :titles="assetTitles" />
</template>
