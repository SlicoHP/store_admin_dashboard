import { useProductHistory } from '@/stores/productHistory'
import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import DashboardHistoryModal from '@/components/DashboardHistoryModal.vue'
import { createTestingPinia } from '@pinia/testing'

describe('Dashboard History Modal', () => {
  it('Adds product to history and updates showHistoryModal', async () => {
    const wrapper = mount(DashboardHistoryModal, {
      props: {
        isModalOpen: false
      },
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              productsHistory: []
            }
          })
        ]
      }
    })

    const store = useProductHistory()

    expect((wrapper.vm as any).showHistoryModal).toBe(false)

    store.$patch({
      productsHistory: [
        {
          id: 1,
          title: 'A product',
          description: 'A testing product'
        }
      ]
    })
    wrapper.vm.isModalOpen = true
    expect((wrapper.vm as any).showHistoryModal).toBe(true)
  })
})
