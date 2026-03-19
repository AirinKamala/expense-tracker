<template>
  <ConfirmModal />
  <div id="appMy">
    <HeaderPane />
    <div class="h-screen mx-[5vw] md:mx-[15vw]">
      <BalanceCard />
      <BudgetCard />
      <CategoriInput />
      <TransactionList />
    </div>
    <AddExpense />
  </div>
</template>
<script setup>
import HeaderPane from './components/HeaderPane.vue'
import BalanceCard from './components/BalanceCard.vue'
import BudgetCard from './components/BudgetCard.vue'
import TransactionList from './components/TransactionList.vue'
import AddExpense from './components/AddExpense.vue'
import ConfirmModal from './components/ConfirmModal.vue'
import CategoriInput from './components/CategoriInput.vue'

import { useTransactionStore } from './stores/transactionStore'
const stores = useTransactionStore()
</script>
<style scope></style>
