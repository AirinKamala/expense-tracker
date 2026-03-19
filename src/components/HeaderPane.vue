<template>
  <div class="flex justify-between items-center px-8 py-4 bg-stone-200 rounded-b-2xl">
    <h1 class="text-2xl font-bold">Halo👋</h1>
    <div class="flex items-center-safe">
      <h2 class="flex font-bold">{{ date.toLocaleDateString('id-ID', custom) }}</h2>
      <button class="hover:text-red-600 text-sm rounded-sm px-2" @click="stores.isDelete = true">
        <i class="fa-solid fa-trash"> </i>
      </button>
    </div>
  </div>

  
</template>
<script setup>
import { useTransactionStore } from '@/stores/transactionStore'
const stores = useTransactionStore()
const date = new Date()
const custom = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}
</script>
