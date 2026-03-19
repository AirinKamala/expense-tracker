<script setup>
import { ref, computed, onMounted, watch } from 'vue'
let judul = ref('')
let harga = ref(0)
let category = ref('makan')
let isDisabled = ref(false);
const sisaUang = computed(() => {
  if (expenseDetail.value.length === 0) return budget.value

  const totalPengeluaran = expenseDetail.value.reduce((totalSementara, item) => {
    // console.log(totalSementara + item.amount)
    return totalSementara + item.amount
  }, 0)

  return budget.value - totalPengeluaran
})
let budget = ref(0)
let expenseDetail = ref([])
let lastId = ref(101)
let see = ref(false)
let categoryList = ref([])
let inputCat = ref('')
const quote = computed(()=>{
  if(sisaUang.value === 0) {
    return "telah be pis e"
  } else if (sisaUang.value <=1000) {
    return "Kle boros ajan ne, stopp plis"
  } else if(sisaUang.value <= 25000) {
        return "Stop belanja, ini buat bensin";
  } else {
    return "Hari ini mau belanja apa?"
  }
})

watch(expenseDetail, (newVal)=>{
  localStorage.setItem('expenseDetail', JSON.stringify(newVal))
}, {deep: true})

function savedExpense() {
  localStorage.setItem('expenseDetail', JSON.stringify(expenseDetail.value))
}

const addExpense = () => {
  if (judul.value.trim() == '' || harga.value == 0) return alert('isi dulu datanya')
  else if (sisaUang.value < harga.value) return alert('Uang anda tidak cukup')
  const date = new Date()
  let newExpense = {
    id: lastId.value,
    title: judul.value,
    amount: harga.value,
    categories: category.value,
    time: date.toISOString().replace('-:.TZ', '').slice(0,10)
  }
  expenseDetail.value.push(newExpense)
  sisaUang.value -= harga.value
  judul.value = ''
  harga.value = 0
  console.log('eee')
  lastId.value++
}

const addCategori = () => {
  categoryList.value.push(inputCat.value);
  inputCat.value = ''
  see.value = false
}

const disabledBtn = () => {
  document.getElementById("budgetInput").disabled = true
}

const openAdd = () => {
  see.value = true
}
</script>

<template>
  <h1 class="text-2xl text-center mt-4 font-bold">Welcome on <span>Expense-Tracker</span></h1>
  <div class="grid grid-cols-4 mx-auto w-[80%] lg:max-w-[60%]">
    <label class="col-span-1" for="sisaUang">Uang anda: Rp</label>
    <input class="col-span-3" v-model="sisaUang" type="number" disabled />
    <h2 id="quote" class="text-center col-span-4">{{quote}}</h2>
    <p>{{ budget.toLocaleString('id', 'ID') }}</p>
    <!-- form input Pengeluaran -->
    <div class="mt-4 col-span-4 grid grid-cols-4">
      <!-- judul input -->
      <label class="my-2 col-span-1" for="title">Tujuan:</label>
      <input v-model="judul" class="my-2 col-span-3" type="text" max="300" />

      <!-- amount input  -->
      <label class="my-2 col-span-1" for="amount">Pengeluaran</label>
      <input v-model="harga" class="my-2 col-span-3" type="number" />

      <!-- kategori select  -->
      <label class="my-2 col-span-1" for="categori">Kategori</label>
      <select name="category" id="category" class="col-span-2 my-1">
        <option class="" @click="openAdd">Add category</option>
        <option class="" v-for="(item, index) in categoryList" :key="index" :value="item">
          {{ item }}
        </option>
      </select>

      <!-- kategori input -->
      <div id="modal" class="col-span-4 grid grid-cols-4 my-4" v-show="see">
        <input
          type="text"
          placeholder="make new category"
          class="bg-white border-2 rounded-md p-2 col-span-2"
          v-model="inputCat"
        />
        <button class="col-span-1 m-0.5" @click="addCategori" @keyup.enter="addCategori">Ok</button>
        <button
          class="col-span-1 m-0.5"
          @click="
            () => {
              see = false
            }
          "
        >
          Cancel
        </button>
      </div>

      <button class="col-span-4" @click="addExpense">Record</button>
    </div>

    

    <label for="budget">Budget : Rp</label>
    <input class="bg-gray-100 border-2 rounded-md" v-model="budget" type="number" :disabled="isDisabled" />
    <button @click="isDisabled= true">Set</button>
  </div>
  <div id="detail" class="flex">
      <div
        class="bg-yellow-100 m-2 rounded-md w-36 flex flex-col justify-center-safe text-center"
        v-for="item in expenseDetail"
      >
        <h2>{{ item.title }}</h2>
        <p>{{ item.amount }}</p>
        <button>{{ item.categories }}</button>
        <p>{{ item.time }}</p>
      </div>
    </div>
</template>

<style scoped></style>

<!-- mau nambah config ke spreadsheet. -->
 <!-- import axios from 'axios';
// ... di dalam komponen/method
axios.get('URL_WEB_APP_ANDA')
  .then(response => {
    this.dataData = response.data;
  });
 -->



 <template>
  <div class="min-h-screen bg-gray-100 pb-20">
    <HeaderPane />
    <BalanceCard />
    <BudgetCard />
    <TransactionList />

    <div class="fixed bottom-6 left-0 right-0 flex justify-center">
      <button
        @click="showForm = true"
        class="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3 rounded-full shadow-lg transition-all"
      >
        + Add Expense
      </button>
    </div>

    <div 
      v-if="showForm" 
      @click="showForm = false"
      class="fixed inset-0 bg-black/50 z-40 transition-opacity"
    ></div>

    <transition name="slide-up">
      <div 
        v-if="showForm" 
        class="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-2xl px-8 pt-6 pb-10"
      >
        <div class="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-6"></div>
        
        <h2 class="text-2xl font-bold mb-4">Input Expense</h2>
        
        <div class="space-y-4">
          <input type="text" placeholder="Nama pengeluaran" class="w-full p-3 border rounded-lg" />
          <button 
            @click="showForm = false"
            class="w-full bg-emerald-500 text-white py-3 rounded-lg font-semibold"
          >
            Simpan
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import HeaderPane from './components/HeaderPane.vue'
import BalanceCard from './components/BalanceCard.vue'
import BudgetCard from './components/BudgetCard.vue'
import TransactionList from './components/TransactionList.vue'
import { ref } from 'vue'

const showForm = ref(false)
</script>

<style scoped>
/* Animasi Slide Up */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease-out;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}
</style>