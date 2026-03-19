<template>
  <div id="detail" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center">
    <div
      class="bg-white rounded-3xl flex shadow-sm hover:shadow-lg p-4 m-2 items-center-safe justify-between"
      v-for="(expense, index) in stores.renderListShow"
      :key="index"
    >
      <div class="flex">
        <div
          id="profile"
          :style="{
            backgroundColor: generateColor(expense.category).bg,
            color: generateColor(expense.category).text,
          }"
          class="size-12 mr-4 text-lg items-center justify-center flex text-center rounded-full font-bold"
        >
          {{ expense.title.charAt(0).toUpperCase() }}
        </div>

        <div>
          <h2 class="font-bold">{{ splitingText(expense.title) }}</h2>
          <p class="text-xs text-slate-700/60">{{ expense.category }} • {{ expense.time }}</p>
        </div>
      </div>
      <div id="amountKet">
        <p class="font-black text-lg text-red-500">
          Rp{{ expense.amount.toLocaleString('id', 'ID') }}
        </p>
      </div>
    </div>
  </div>

  <h2 v-show="stores.transactions.length === 0" class="text-center font-black text-2xl">
    You don't have any expense
  </h2>
<!-- 
  <h2 v-show="stores.renderListShow.length === 0" class="text-center font-black text-2xl">
    You don't have any expense on this category
  </h2> -->
</template>
<script setup>
import { ref } from 'vue'
import { useTransactionStore } from '@/stores/transactionStore'

const stores = useTransactionStore()
// let expenseList = ref([
//     {
//         id:1,
//         title: 'Roti',
//         amount: 2000,
//         category: 'Makan',
//         time: '2026-03-03'
//     },
//     {
//         id:2,
//         title: 'Bensin',
//         amount: 20000,
//         category: 'Transport',
//         time: '2026-03-03'
//     },{
//        id:3,
//         title: 'Bensin',
//         amount: 20000,
//         category: 'Transport',
//         time: '2026-03-03'
//     },{
//        id:4,
//         title: 'Bensin',
//         amount: 20000,
//         category: 'Transport',
//         time: '2026-03-03'
//     },{
//         id:1,
//         title: 'Roti',
//         amount: 2000,
//         category: 'Makan',
//         time: '2026-03-03'
//     },
//     {
//         id:2,
//         title: 'Bensin',
//         amount: 20000,
//         category: 'Transport',
//         time: '2026-03-03'
//     },{
//        id:3,
//         title: 'Bensin',
//         amount: 20000,
//         category: 'Transport',
//         time: '2026-03-03'
//     },{
//         id:1,
//         title: 'Roti',
//         amount: 2000,
//         category: 'Makan',
//         time: '2026-03-03'
//     },
//     {
//         id:2,
//         title: 'Bensin',
//         amount: 20000,
//         category: 'Transport',
//         time: '2026-03-03'
//     },{
//        id:3,
//         title: 'Bensin',
//         amount: 20000,
//         category: 'Transport',
//         time: '2026-03-03'
//     },{
//        id:4,
//         title: 'Bensin',
//         amount: 20000,
//         category: 'Transport',
//         time: '2026-03-03'
//     },{
//         id:1,
//         title: 'Roti',
//         amount: 2000,
//         category: 'Makan',
//         time: '2026-03-03'
//     },
//     {
//         id:2,
//         title: 'Bensin',
//         amount: 20000,
//         category: 'Transport',
//         time: '2026-03-03'
//     },{
//        id:3,
//         title: 'Bensin',
//         amount: 20000,
//         category: 'Transport',
//         time: '2026-03-03'
//     },
// ]);

const generateColor = (category) => {
  const colorCategory = stores.categories.find((e) => e.name === category)
  return colorCategory ? {bg:colorCategory.bg, text: colorCategory.text} : {bg:'#dbeafe', text:'#1e40af'}
}

function splitingText(text) {
  let display = text.length > 25 ? text.substring(0, 25) + '...' : text
  return display
}
</script>
