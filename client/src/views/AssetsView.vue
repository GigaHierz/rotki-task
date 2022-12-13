<script setup lang="ts">
import AssetList from "../components/AssetList.vue";
import { client } from "../../utils/client";

let userData;
const fetchData = async () => {
  const path = await client("balances").then((data) => {
    console.log(data);
    userData = data.balances;
  });
  console.log(path);
};

fetchData();
</script>

<template>
  <main>
    <AssetList :balances="userData" />
  </main>
</template>

<style lang="scss"></style>
