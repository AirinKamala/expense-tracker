<template>
  <div id="kategori">
    <div class="flex mx-4">
      <span>Kategori: </span>
      <input
        type="text"
        v-show="inputCat"
        @keyup.enter="addCategori()"
        class="px-2 mx-2 border-2 h-fit rounded-md border-black/20"
        v-model="category"
      />
      <button
        @click="addCategori()"
        class="bg-gray-300/50 hover:focus:bg-gray-400 transition-all px-2 mx-2 rounded-lg"
      >
        Add
      </button>
    </div>

    <div id="categoriList" class="flex overflow-x-scroll mx-4 my-2">
      <button class="border mb-2 mx-0.5 px-2 min-w-fit rounded-2xl" @click="stores.filtered = 'all'">All</button>
    
      <button v-for="(item, index) in stores.categories" class="border mb-2 mx-0.5 px-2 min-w-fit rounded-2xl" @click="stores.filtered =item.name" :key="index" :style="{backgroundColor: item.bg, color: item.text}">
        {{ item.name }}</button
      >
    </div>
  </div>
</template>

<script setup>
import { useTransactionStore } from '@/stores/transactionStore'
import { ref } from 'vue'

const stores = useTransactionStore()

const inputCat = ref(false)
const category = ref('')

const addCategori = () => {
  if (!inputCat.value) {
    return (inputCat.value = true)
  }
  if (inputCat.value) {
    if (category.value.trim() === '') return alert('isi data')
    
    stores.addingCategory(category.value)
    category.value = ''
    inputCat.value = false
    alert('Kategori berhasil ditambahkan')
  }
}
</script>

<style></style>
