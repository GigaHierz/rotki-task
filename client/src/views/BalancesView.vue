<script lang="ts">
import { useBalanceStore } from "@/stores/BalanceStore";
import BalancesList from "../components/BalancesList.vue";

export default {
  setup() {
    const balanceStore = useBalanceStore();
    return {
      balanceStore,
    };
  },
  created() {
    this.balanceStore.fetchBalances().catch((error) => {
      this.$router.push({
        name: "ErrorDisplay",
        params: { error: error },
      });
    });
  },
};
const userData = "hallo";
</script>

<template>
  <main>
    {{ balanceStore.getAllBalances }}
    {{
      balanceStore.getBalancesForAccount(
        "0xABC59231bfC2B3d308EB851541D4591CeA941FF3"
      )
    }}
    {{ balanceStore.getOverviewOfAllCurrencies }}

    <BalancesList :balances="userData" />
  </main>
</template>

<style lang="scss"></style>
