<script setup>
const props = defineProps(["balance"]);
</script>

<template>
  <div class="my-14 text-center">
    <h1 class="text-5xl font-bold text-black dark:text-white">
      $ {{ props.balance.toFixed(2) }}
    </h1>
    <span class="text-xs text-gray-500 dark:text-gray-700">Your balance</span>
  </div>
</template>
