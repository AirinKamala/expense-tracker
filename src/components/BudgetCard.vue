<template>
  <div class="bg-slate-800 mx-8 my-4 text-white rounded-md p-4 shadow-xl">
    <h2>Budget Anda:</h2>
    <div class="flex justify-between">
      <h1 class="text-3xl font-bold">
        <span class="text-lg">Rp</span>{{ stores.budget.toLocaleString('id', 'ID') }}
      </h1>
      <button class="text-2xl hover:bg-white/20 px-2 rounded-md" @click="()=>{
        if(!showInput) {
          val = '-'
          return showInput = true }
          val = '+'
        return showInput = false
      }">
        {{val}}
      </button>
    </div>
    <div id="inputbudget" class="mt-8" v-if="showInput">
      <label for="budget">Rp</label>
      <input
        type="number"
        v-model="myBudget"
        :disabled="!showInput"
        placeholder="Masukkan budget anda"
        name="budget"
        class="bg-white/10 hover:bg-white/30 rounded-md mx-4 px-2 text-md"
        id=""
      />
      <button
        @click="setBudget"
        class="bg-green-600 w-full mt-4 py-0.5 rounded-md hover:focus:bg-emerald-600 text-white duration-500 font-bold"
      >
        Set
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useTransactionStore } from '@/stores/transactionStore'

const stores = useTransactionStore()
const myBudget = ref(0)
const showInput = ref(false)
const val = ref('+')
const setBudget = () => {
  val.value = '+'
  stores.budget = myBudget.value
  localStorage.setItem('capitalMoney', JSON.stringify(myBudget.value));
  myBudget.value = ''
  showInput.value = false
}
</script>
