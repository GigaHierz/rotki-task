<script setup lang="ts">
import BalancesList from "../components/BalancesList.vue";

const userData = "hallo";
</script>

<template>
  <main><BalancesList :balances="userData" /></main>
</template>

<style lang="scss"></style>
