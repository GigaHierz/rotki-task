<script lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { useBalanceStore } from "@/stores/BalanceStore";

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
  computed: {
    sum() {
      return this.balanceStore.getSum;
    },
  },
};
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Balances</RouterLink>
        <RouterLink to="/events">Events</RouterLink>
      </nav>
    </div>
    <div class="wrapper">Your current balance : ${{ balanceStore.sum }}</div>
  </header>

  <RouterView />
</template>

<style scoped lang="scss">
header {
  line-height: 1.5;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  .wrapper {
    margin: auto;
  }
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;

  a {
    padding: 0 1rem;

    &.router-link-exact-active {
      color: var(--color-text);
      :hover {
        background-color: transparent;
      }

      &:first-of-type {
        border: 0;
      }
    }
  }
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
    .wrapper {
      display: flex;
      place-items: flex-start;
      flex-wrap: wrap;
    }

    nav {
      text-align: left;
      margin-left: -1rem;
      font-size: 1rem;

      padding: 1rem 0;
      margin-top: 1rem;
    }
  }
}
</style>
