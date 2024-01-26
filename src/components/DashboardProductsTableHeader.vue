<script lang="ts" setup>
const emits = defineEmits(['prev', 'next', 'update:modelValue'])
defineProps<{
    modelValue: string,
    currentPage: number,
    isFirstPage: boolean,
    isLastPage: boolean
}>()

function updateModelValue(event: Event) {
    if (event.target instanceof HTMLInputElement) {
        emits('update:modelValue', event.target.value)
    }
}
</script>

<template>
    <div class="flex items-center gap-x-4 mb-4 justify-end">
        <RouterLink :to="{ name: 'product_create' }"
            class="bg-sky-500 hover:bg-sky-700 px-5 py-2.5 text-sm leading-5 rounded-md font-semibold text-white">Add
            product</RouterLink>
        <input type="text" placeholder="Search..." :value="modelValue" @input="updateModelValue"
            class="px-3 py-2 w-1/4 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-green-500 block rounded-md sm:text-sm focus:ring-1  disabled:shadow-none">
        <button :disabled="isFirstPage" :class="{ 'text-gray-500': isFirstPage }" @click="emits('prev')"><span
                class="mr-1">&lt;</span>Prev</button>
        <span>{{ currentPage }}</span>
        <button :disabled="isLastPage" :class="{ 'text-gray-500': isLastPage }" @click="emits('next')">Next<span
                class="ml-1">&gt;</span></button>
    </div>
</template>