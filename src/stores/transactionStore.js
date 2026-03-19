//disini kita nyimpan semua sementara sebelum confirm.
//benerin id dengan time stamp

import { defineStore } from 'pinia'
import { ref, computed, renderList } from 'vue'

export const useTransactionStore = defineStore('transaction', () => {
  // ====================================================================================================================================
  // var start here 
const categories = ref(JSON.parse(localStorage.getItem('myCategories')) || [{name:'Makanan', bg: '#fecaca', text: '#991b1b'}])
  const sisaUang = computed(() => {
    const fromBudget = Number(budget.value) || 0

    const totalPengeluaran = (transactions.value || []).reduce((box, item) => {
      return box + Number(item.amount)
    }, 0)

    if (totalPengeluaran === 0 && fromBudget === 0) return 0

    return fromBudget - totalPengeluaran
  })
  const transactions = ref(JSON.parse(localStorage.getItem('myExpense')) || []) //untuk dapet nilai transaksi ke localStorage
  //untuk buka tutup modal
  const isFormOpen = ref(false)
  const isConfirmOpen = ref(false)
  const isSuccess = ref(false)
  const isDelete = ref(false)
  //untuk var random

  const budget = ref(JSON.parse(localStorage.getItem('capitalMoney')) || 0)
  const judul = ref('')
  const jumlah = ref(0)
  const kategori = ref('')
  const filtered = ref('all')
  const colors = [
  { bg: '#fecaca', text: '#991b1b' },
  { bg: '#fed7aa', text: '#9a3412' },
  { bg: '#fef08a', text: '#854d0e' },
  { bg: '#d9f99d', text: '#3f6212' },
  { bg: '#a7f3d0', text: '#065f46' },
  { bg: '#bae6fd', text: '#075985' },
  { bg: '#c7d2fe', text: '#3730a3' },
  { bg: '#e9d5ff', text: '#6b21a8' },
  { bg: '#fbcfe8', text: '#9d174d' },
  { bg: '#e2e8f0', text: '#1e293b' },
]
  const tempExpense = ref({ //tempoary value berfore confirm
    id: '', 
    title: judul.value || '',
    amount: jumlah.value || 0,
    category: kategori.value || '',
    time: '',
  })

// ======================================================================================================================================
// function start her
  function addingCategory(inputCategoryName) {
    if(!categories.value) return categories.value =[{name:'Makanan', bg: '#fecaca', text: '#991b1b'}]
    const colorIndex = categories.value.length % colors.length
    const newCategory = {
      name: inputCategoryName,
      bg: colors[colorIndex].bg,
      text: colors[colorIndex].text

    }
    categories.value.push(newCategory)
    localStorage.setItem('myCategories', JSON.stringify(categories.value))
  }
  const renderListShow = computed(()=>{
    if(filtered.value === 'all') return transactions.value

    return transactions.value.filter(
      (item) => item.category == filtered.value
    )
  })
  //tambahkan component untuk search filter berdasarkan title, nama, dan harga.
  function savedTransaction() {
    try {
      if (transactions.value == null) {
        transactions.value = []
      }

      transactions.value.unshift(tempExpense.value)
      localStorage.setItem('myExpense', JSON.stringify(transactions.value))
      isSuccess.value = true
    } catch (error) {
      alert('Error di : ' + error)
    }
  }

  function closeAllModal() {
    isConfirmOpen.value = false
    isFormOpen.value = false
    isSuccess.value = false

    judul.value = ''
    jumlah.value = ''
    kategori.value = ''
  }

  function deleteData() {
    budget.value = 0
    transactions.value = []
    alert('Data dihapus')
    localStorage.clear()
    isDelete.value = false
    window.location.reload()
  }

  return {
    budget,
    sisaUang,
    isFormOpen,
    isConfirmOpen,
    isSuccess,
    categories,
    isDelete,
    tempExpense,
    transactions,
    judul,
    jumlah,
    kategori,
    filtered,
    renderListShow,
    savedTransaction,
    closeAllModal,
    addingCategory,
    deleteData,
  }
}) //export
