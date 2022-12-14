<script setup lang="ts">
import ListTemplate from "./ListTemplate.vue";
import { balancesTitles } from "../data/data";
import type { BalancesFlattened } from "../types/types";
const props = defineProps({
  filteredBalanceList: { required: true, type: Array<BalancesFlattened> },
  balances: { required: true, type: Array<BalancesFlattened> },
});

const balanceTitles = balancesTitles;

// console.log(props.balances);
</script>

<template>
  <list-template :titles="balanceTitles" />
  <div>
    {{ balances }}
  </div>
</template>
