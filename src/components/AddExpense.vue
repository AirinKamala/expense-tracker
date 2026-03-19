<template>
  <!-- //button -->
  <div class="fixed flex justify-center z-5 bottom-4 right-0 left-0  pb-[safe-area-inset-bottom]">
    <button
      @click="stores.isFormOpen = true"
      class="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3 rounded-full shadow-lg transition-all"
    >
      + Add Expense
    </button>
  </div>

  <!-- overlay  -->
  <div
    v-show="stores.isFormOpen"
    class="inset-0 bg-gray-900/20 fixed h-screen w-screen z-10"
    @click="stores.isFormOpen = false"
    id="blank"
  ></div>

  <!-- //input form -->
  <transition name="slide-up">
    <div
      v-show="stores.isFormOpen"
      id="formInput"
      class="fixed bg-gray-200 z-20 bottom-0 px-8 py-4 text-center rounded-t-2xl w-full"
    >
      <div class="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-6"></div>

      <h2 class="text-2xl">Input Expense</h2>
      <div class="grid grid-cols-4 md:w-lg mx-auto items-center-safe">
        <!-- deskripsi pengeluaran  -->
        <label class="col-span-1" for="judul">Deskripsi :</label>
        <input
          required
          type="text"
          class="border-0.5 rounded-xl m-2 px-2 bg-gray-100  col-span-3"
          name=""
          id="judul"
          placeholder="Makan siang"
          v-model="stores.judul"
        />
        <!-- jumlah pengeluaran  -->
        <label class="col-span-1" for="jumlah">Nominal :</label>
        <input
          required
          type="number"
          name=""
          class="border-0.5 rounded-xl m-2 px-2 bg-gray-100  col-span-3"
          id="jumlah"
          placeholder="ex. 1000"
          v-model="stores.jumlah"
        />
        <!-- kategori  -->
        <label class="col-span-1" for="jumlah">Kategori :</label>
        <select
          required
          name="kategori"
          class="border-0.5 rounded-xl m-2 px-2 bg-gray-100  col-span-3"
          id="kategori"
          v-model="stores.kategori"
        >
          <option v-for="(cat, index) in stores.categories" :key="index" :value="cat.name">
            {{ cat.name }}
          </option>
        </select>
      </div>
      <button
        class="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3 rounded-full shadow-lg transition-all"
        @click="addExpenses"
      >
        Continue
      </button>
    </div>
  </transition>
</template>
<script setup>
import { useTransactionStore } from '@/stores/transactionStore'

const stores = useTransactionStore()

const addExpenses = () => {
  if (stores.judul.trim === '' || stores.jumlah === 0 || stores.kategori === '')
    return alert('Isi data terlebih dahulu!')
  if (stores.sisaUang < stores.jumlah) return alert('Saldo anda tidak cukup!')
  stores.isConfirmOpen = true

  const timeCus = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }
  const date = new Date()


  stores.tempExpense = {
    id:
      date.toISOString().slice(0, 10).replaceAll('-', '') +
      date.toLocaleTimeString('id-ID', timeCus).replaceAll('.', ''),
    title: stores.judul,
    amount: stores.jumlah,
    category: stores.kategori,
    time: date.toLocaleDateString('id-ID', {day:'numeric',month: 'long', year: 'numeric' }),
  }
  console.log(stores.tempExpense)
}
</script>
<style scope>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 1s ease-in-out;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}

a {
  scroll-behavior: smooth;
}
</style>
