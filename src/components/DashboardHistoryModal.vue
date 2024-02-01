<script lang="ts" setup>
import { useProductHistory } from '@/stores/productHistory';
import { computed, onMounted, ref } from 'vue';

const productHistoryStore = useProductHistory();

const isModalOpen = ref(false)

function closeHistoryModal() {
    isModalOpen.value = false
}

const showHistoryModal = computed(() => {
    return productHistoryStore.productsHistory.length > 0 && isModalOpen.value
})

onMounted(() => {
    isModalOpen.value = productHistoryStore.productsHistory.length > 0
})
</script>

<template>
    <div v-show="showHistoryModal" class="bg-gray-800 text-white w-fit fixed bottom-0 left-0 rounded-tr-xl">
        <div class="relative p-6">
            <p class="text-xl mb-4">Latest created products:</p>
            <span class="text-2xl cursor-pointer top-4 right-6 absolute" @click="closeHistoryModal">x</span>
            <pre
                class="block whitespace-pre overflow-y-scroll max-h-[300px]">{{ productHistoryStore.productsHistory }}</pre>
        </div>
    </div>
</template>