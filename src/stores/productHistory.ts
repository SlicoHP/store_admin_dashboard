import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Product } from '@/types/product'

export const useProductHistory = defineStore('product_history', () => {
  const productsHistory: Ref<Partial<Product>[]> = ref([])

  function addHistoryEntrie(product: Partial<Product>) {
    productsHistory.value.push(product)
  }

  return { productsHistory, addHistoryEntrie }
})
