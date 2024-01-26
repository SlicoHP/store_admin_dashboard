<script lang="ts" setup>
import { useFetch } from '@vueuse/core'
import { ref, watch, type Ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { Product } from '@/types/product'
import DashboardProductTableItem from '@/components/DashboardProductTableItem.vue';
import DashboardProductsTableHeader from './DashboardProductsTableHeader.vue';

const router = useRouter();
const route = useRoute();

const offset = computed(() => {
    return (page.value - 1) * 10
})

const productsExists = computed(() => {
    return products.value?.length
})

const products: Ref<Product[] | null> = ref([])
const page: Ref<number> = ref(Number(route.query.page) || 1)
const currentPage: Ref<number> = ref(Number(route.query.page) || 1)
const isLastPage: Ref<boolean> = ref(false)
const search: Ref<string> = ref('')
const url: Ref<string> = ref(`https://api.escuelajs.co/api/v1/products?limit=10&offset=${offset.value}`)

const { onFetchResponse, onFetchError, isFetching } = useFetch(url, { refetch: true })

onFetchResponse(async (response) => {
    const data = await response.json();
    if (data.length > 0) {
        isLastPage.value = false
        router.replace({ name: 'products', query: { page: page.value } })
        products.value = data
        currentPage.value = page.value
        return;
    }
    isLastPage.value = true
})

onFetchError((error) => {
    console.error(error)
})

watch(() => page.value, () => {
    if (isLastPage.value) {
        page.value--
        isLastPage.value = false
        return;
    }
    url.value = `https://api.escuelajs.co/api/v1/products?limit=10&offset=${offset.value}`
})

watch(() => search.value, () => {
    url.value = `https://api.escuelajs.co/api/v1/products/?title=${search.value}`
})

function onPrev() {
    if (page.value === 1) {
        return
    }
    page.value--
}

function onNext() {
    if (isLastPage.value) {
        return
    }
    page.value++
}

const isFirstPage = computed(() => {
    return page.value === 1 || page.value === 0
})

function refresh() {
    isLastPage.value = false
    page.value = 1
    currentPage.value = 1
}
</script>

<template>
    <div v-if="productsExists">
        <DashboardProductsTableHeader @prev="onPrev" @next="onNext" :is-first-page="isFirstPage" :is-last-page="isLastPage"
            :current-page="currentPage" :model-value="search" @update:model-value="newValue => search = newValue" />
        <table class="border-collapse table-auto w-full text-sm">
            <thead>
                <tr>
                    <th class="border-b  font-medium p-4 pl-8 pt-0 pb-3 text-slate-400  text-left">
                        Title</th>
                    <th class="border-b  font-medium p-4 pt-0 pb-3 text-slate-400  text-left">
                        Price</th>
                    <th class="border-b  font-medium p-4 pr-8 pt-0 pb-3 text-slate-400  text-left">
                        Description</th>
                </tr>
            </thead>
            <tbody class="bg-white">
                <DashboardProductTableItem v-for="product in products" :key="product.id" :product="product" />
            </tbody>
        </table>
    </div>
    <div v-else-if="!isFetching">
        No products found. Click <span class="text-green-600 cursor-pointer" @click="refresh">here
        </span>
    </div>
</template>