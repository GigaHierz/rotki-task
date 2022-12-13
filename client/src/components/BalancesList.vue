<script setup lang="ts">
import ListTemplate from "./ListTemplate.vue";
import { balancesTitles } from "../data/data";
import { Accounts } from "../types/types";
const props = defineProps({
  // balances: { required: true, type: Object<typeof Accounts> },
  balances: { required: true, type: String },
});

const balanceTitles = balancesTitles;
</script>

<template>
  <list-template :titles="balanceTitles" />
  <div>
    {{ balances }}
  </div>
</template>
