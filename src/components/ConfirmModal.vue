<template>
  <div
    v-if="stores.isConfirmOpen"
    class="fixed w-full md:w-md md:-translate-x-1/2 md:left-1/2 md:top-4 z-30 p-8 rounded-lg bg-white drop-shadow-2xl"
  >
    <div>
      <h1
        class="text-3xl size-12 text-center pt-0.5 border shadow-lg mx-auto font-black rounded-full bg-yellow-400"
      >
        !
      </h1>
      <h2 class="text-2xl font-bold text-center">Confirm Expense</h2>

      <div class="mt-4">
        <p class="">NAMA PEMBELIAN : {{ stores.tempExpense.title }}</p>
        <p class="">NOMINAL : Rp{{ stores.tempExpense.amount.toLocaleString('id', 'ID') }}</p>
        <p class="">KATEGORI : {{ stores.tempExpense.category }}</p>
        <p class="">WAKTU : {{ stores.tempExpense.time }}</p>

        <p class="text-center font-semibold mt-8">
          Pastikan data sudah benar karena data bersifat permanen.
        </p>
      </div>
    </div>

    <!-- yes/no  -->
    <div class="grid grid-cols-2 my-4">
      <button
        @click="stores.savedTransaction"
        class="col-span-1 font-semibold py-0.5 bg-emerald-400 w-24 mx-auto rounded-lg hover:focus:bg-emerald-600 transition-all"
      >
        Save
      </button>
      <button
        @click="stores.isConfirmOpen = false"
        class="col-span-1 font-semibold py-0.5 bg-red-400 w-24 mx-auto rounded-lg hover:focus:bg-rose-600 transition-all"
      >
        Cancel
      </button>
    </div>
  </div>

  <div
    v-if="stores.isSuccess"
    class="fixed z-30 m-4 p-8 md:-translate-1/2 md:left-1/2 md:top-1/2 md:w-[20rem] rounded-lg bg-white drop-shadow-2xl"
  >
    <div>
      <h1
        class="text-3xl size-12 text-center pt-0.5 border shadow-lg mx-auto font-black rounded-full bg-emerald-400"
      >
        ✔
      </h1>
      <h2 class="text-2xl font-bold text-center">Success</h2>

      <div class="uppercase mt-4 mb-8">
        <p class="">NAMA PEMBELIAN : {{ stores.tempExpense.title }}</p>
        <p class="">NOMINAL : Rp{{ stores.tempExpense.amount.toLocaleString('id', 'ID') }}</p>
        <p class="">KATEGORI : {{ stores.tempExpense.category }}</p>
        <p class="">WAKTU : {{ stores.tempExpense.time }}</p>
        <p class="text-center font-semibold mt-8">
          BUDGET ANDA BERKURANG SECARA OTOMATIS <br />
          HARAP TANDA TERIMA INI DISIMPAN DAN DIINGAT SEBAGAI BUKTI <u>PEMBOROSAN</u> <br />
          TERIMAKASIH
        </p>
      </div>
    </div>
    <button
      @click="stores.closeAllModal"
      class="col-span-1 font-semibold p-2 flex bg-teal-400 mx-auto rounded-lg hover:focus:bg-teal-500 transition-all"
    >
      Back to Home
    </button>
  </div>

  <div v-if="stores.isDelete" class="fixed z-30 m-4 p-8 md:-translate-1/2 md:left-1/2 md:top-1/2 md:w-[20rem] rounded-lg bg-white drop-shadow-2xl">
    <div>
      <h1
        class="text-3xl size-12 text-center pt-0.5 border shadow-lg mx-auto font-black rounded-full bg-red-400"
      >
        <i class="fa-solid fa-trash text-[1.5rem]"></i>
      </h1>
      <h2 class="text-2xl font-bold text-center">Delete All Data</h2>
      <h3 class="text-center">Data akan dihapus dan tidak dapat dipulihkan kembali!</h3>
    </div>
    <div class="grid grid-cols-2 my-4">
      <button
        @click="stores.deleteData"
        class="col-span-1 font-semibold py-0.5 bg-emerald-400 w-28 mx-auto rounded-lg hover:focus:bg-emerald-600 transition-all"
      >
        Yes, delete it
      </button>
      <button
        @click="stores.isDelete = false"
        class="col-span-1 font-semibold py-0.5 bg-red-400 w-28 mx-auto rounded-lg hover:focus:bg-rose-600 transition-all"
      >
        Cancel
      </button>
    </div>
  </div>
</template>
<style></style>
<script setup>
import { ref } from 'vue'
import { useTransactionStore } from '@/stores/transactionStore'
const stores = useTransactionStore()
</script>
