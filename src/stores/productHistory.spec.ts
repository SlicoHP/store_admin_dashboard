import { setActivePinia, createPinia } from 'pinia'
import { useProductHistory } from '@/stores/productHistory'
import { describe, beforeEach, expect, it } from 'vitest'

describe('Product History Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('adds product to history', () => {
    const historyStore = useProductHistory()

    expect(historyStore.productsHistory).toHaveLength(0)

    historyStore.addHistoryEntrie({
      id: 1,
      title: 'A product',
      description: 'A testing product'
    })

    expect(historyStore.productsHistory).toHaveLength(1)
  })
})
