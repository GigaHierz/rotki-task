<script setup lang="ts">
const props = defineProps({
  titles: { required: true, type: Array<String> },
});

console.log(props.titles);
</script>

<template>
  <ul>
    <li class="item" v-for="(title, index) in titles" :key="index">
      {{ title }}
    </li>
  </ul>
</template>

<style scoped>
ul {
  display: flex;
  flex-direction: row;
  list-style-type: none;
}
.item {
  margin-top: 2rem;
}

@media (min-width: 1024px) {
  .item {
    margin-top: 0;
    padding: 0.4rem 0 1rem calc(var(--section-gap) / 2);
  }
}
</style>
