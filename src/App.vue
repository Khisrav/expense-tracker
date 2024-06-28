<script setup>
import { ref } from "vue";
import IncomeExpenses from "./components/IncomeExpenses.vue";
import Balance from "./components/Balance.vue";
import Empty from "./components/Empty.vue";
import NewTransaction from "./components/NewTransaction.vue";
import Transaction from "./components/Transaction.vue";
import ActionButtons from "./components/ActionButtons.vue";
import { useTracker } from "./stores";

// const transactions = ref(initTracker());
const operations = useTracker();

const isOpen = ref(false);
const isDeleteMode = ref(false);

function openDialog() {
  isOpen.value = true;
}

function closeDialog() {
  isOpen.value = false;
}

function toggleDeleteMode() {
  isDeleteMode.value = !isDeleteMode.value;
}

function selectTransaction(id) {
  if (isDeleteMode.value) {
    operations.select(id);
  }
}
</script>

<template>
  <div class="container m-auto dark:bg-black">
    <Balance :balance="operations.balance" />

    <IncomeExpenses :income="operations.income()" :expenses="operations.expenses()" />

    <ActionButtons
      @openDialog="openDialog"
      :deleteMode="isDeleteMode"
      @deleteMode="toggleDeleteMode"
    />

    <div
      v-for="{ title, amount, time, type, id } in [...operations.operations].reverse()"
      :key="id"
    >
      <Transaction
        :title="title"
        :amount="amount"
        :time="time"
        :type="type"
        :isSelected="operations.selected.includes(id)"
        @click="selectTransaction(id)"
        :deleteMode="isDeleteMode"
      />
    </div>

    <Empty v-if="operations.operations.length == 0" />

    <NewTransaction :isOpen="isOpen" @close="closeDialog" />
  </div>
</template>
