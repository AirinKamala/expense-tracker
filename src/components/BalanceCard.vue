<template>
  <div class="mx-8 my-4 bg-indigo-600 text-white rounded-md p-4 shadow-xl">
    <h1 class="text-3xl font-bold"><span class="text-lg">Rp</span>{{ stores.sisaUang.toLocaleString('id', 'ID')}}</h1> <!--isi locale string-->
    <h2 class="mt-2 px-2" >{{ quote }}</h2>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue'
import { useTransactionStore } from '@/stores/transactionStore'

const stores = useTransactionStore()
// let sisaUang = ref(10000)
let quote = computed(() => {
    if(stores.sisaUang === 0) return 'Maaf uang anda habis!'
    else if(stores.sisaUang<= 20000) return "Stop belanja, sisakan uang untuk keadaan darurat!"
    else return 'Ayo catat pengeluaran anda!'
    
})
</script>
