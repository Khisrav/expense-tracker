<script setup>
const tg_username = window.Telegram.WebApp.initDataUnsafe.user
  ? window.Telegram.WebApp.initDataUnsafe.user.username
  : null;
</script>

<template>
  <div v-if="tg_username" class="p-3 text-center pb-0 font-bold tracking-wider">
    <span
      class="bg-black text-white px-5 py-1.5 rounded-full dark:text-black dark:bg-white"
      >@{{ tg_username }}</span
    >
  </div>
</template>
