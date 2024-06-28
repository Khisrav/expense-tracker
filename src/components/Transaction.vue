<script setup>
import { convertSecondsToDate } from "../services/main";

const props = defineProps([
  "title",
  "time",
  "amount",
  "type",
  "deleteMode",
  "isSelected",
]);

const priceFormatter = (price) => {
  if (price == parseInt(price)) {
    return price;
  } else {
    return price.toFixed(2);
  }
};
</script>

<template>
  <div
    class="m-4 flex justify-between items-center gap-4"
    :class="[
      props.deleteMode && props.isSelected ? 'text-gray-300 dark:text-gray-800' : '',
    ]"
  >
    <div class="overflow-hidden">
      <p class="m-0 truncate">{{ props.title }}</p>
      <span class="text-xs text-gray-500 dark:text-gray-700">{{
        convertSecondsToDate(props.time)
      }}</span>
    </div>
    <div class="flex-none">
      <span
        :class="[
          props.deleteMode && props.isSelected
            ? 'text-gray-300 dark:text-gray-800'
            : props.type == 'Income'
            ? 'text-green-400 dark:text-green-200'
            : 'text-red-400 dark:text-red-200',
        ]"
        class="text-[18px] font-medium"
        >$ {{ priceFormatter(props.amount) }}</span
      >
    </div>
  </div>
</template>
