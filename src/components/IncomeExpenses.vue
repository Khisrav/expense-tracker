<script setup>
const props = defineProps(["income", "expenses"]);
</script>

<template>
  <div class="grid grid-cols-2 gap-4 m-4">
    <div
      class="p-4 border shadow-2xl border-green-100 shadow-green-100 bg-green-50/75 dark:bg-swamp-green rounded-xl dark:border-[#242B21] dark:shadow-swamp-green"
    >
      <h3 class="text-black dark:text-white">Income</h3>
      <h2 class="font-bold text-green-400 dark:text-green-200 mt-8 text-2xl">
        $ {{ props.income.toFixed(2) }}
      </h2>
    </div>
    <div
      class="p-4 border shadow-2xl border-red-100 shadow-red-100 bg-red-50/75 dark:bg-swamp-red rounded-xl dark:border-[#362424] dark:shadow-swamp-red"
    >
      <h3 class="text-black dark:text-white">Expenses</h3>
      <h2 class="font-bold text-red-400 dark:text-red-200 mt-8 text-2xl">
        $ {{ props.expenses.toFixed(2) }}
      </h2>
    </div>
  </div>
</template>
