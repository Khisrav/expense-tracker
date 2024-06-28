<script setup>
import { ref } from "vue";
import { useTracker } from "../stores";

const emit = defineEmits(["openDialog", "deleteMode"]);
const props = defineProps(["deleteMode"]);
const operations = useTracker();

if (localStorage.getItem("theme")) {
  document.documentElement.classList.add(localStorage.getItem("theme"));
}

const isDarkMode = ref(document.documentElement.classList.contains("dark"));

function themeToggler() {
  document.documentElement.classList.toggle("dark");

  isDarkMode.value = document.documentElement.classList.contains("dark");

  localStorage.setItem("theme", isDarkMode.value ? "dark" : "");
}

function removeSelected() {
  operations.remove();
  emit("deleteMode", false);
}
</script>

<template>
  <div class="m-4 mb-8 flex gap-4">
    <button
      @click="themeToggler()"
      type="button"
      class="bg-none border border-black transition text-center text-black dark:border-white dark:text-white rounded-lg p-2 font-bold flex justify-center items-center w-12 h-12"
    >
      <svg
        class="w-6 h-6"
        :class="[isDarkMode ? 'hidden' : '']"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
        ></path>
      </svg>
      <svg
        class="w-6 h-6"
        :class="[isDarkMode ? '' : 'hidden']"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
          fill-rule="evenodd"
          clip-rule="evenodd"
        ></path>
      </svg>
    </button>
    <button
      type="button"
      @click="emit('openDialog')"
      data-ripple-light="true"
      data-dialog-target="new-transaction"
      class="bg-black text-white dark:bg-white dark:text-black rounded-lg px-4 py-2 font-semibold flex-1"
      :class="[props.deleteMode ? 'hidden' : '']"
    >
      New operation
    </button>
    <button
      type="button"
      @click="props.deleteMode ? removeSelected() : emit('deleteMode')"
      data-ripple-light="true"
      data-dialog-target="new-transaction"
      class="bg-red-50/75 border transition text-center border-red-100 text-red-400 dark:bg-red-200 dark:border-[#362424] dark:text-[#362424] rounded-lg p-2 font-bold flex justify-center items-center w-12 h-12"
      :class="[props.deleteMode ? 'flex-1' : '']"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        class="inline-block w-6 h-6"
      >
        <path
          fill="currentColor"
          d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"
        />
      </svg>
    </button>
  </div>
</template>
