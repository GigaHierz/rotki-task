<script lang="ts">
import { useBalanceStore } from "@/stores/BalanceStore";
// import BalancesList from "../components/BalancesList.vue";

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
  // computed: {
  //   getBalances() {
  //     return this.balanceStore.balancesForAccount(
  //       "0xabc11a5acc3ad66025c21f24a91dd71d0fc28a46"
  //     );
  //   },
  // },
};
</script>

<template>
  <main>
    <div>
      <p>Wallet: {{ selected }}</p>
      <select v-model="selected">
        <option v-for="(account, index) in balanceStore.accounts" :key="index">
          {{ account }}
        </option>
      </select>
    </div>

    <ul>
      <li v-for="(balance, index) in balanceStore.balancesSum" :key="index">
        Asset: {{ balance.currency }}, Value: {{ balance.amount }}, USD Value:
        {{ balance.usd_value }}, Percentage: {{ balance.percentage }},
      </li>
    </ul>
  </main>

  <!-- {{ balanceStore.balancesForAccount(selected.toString()) }} -->
</template>

<style lang="scss"></style>
