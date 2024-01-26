<script lang="ts" setup>
import type { Product } from '@/types/product'

defineProps<{
    product: Product
}>()
</script>

<template>
    <tr>
        <td class="border-b border-slate-100  p-4 pl-8 text-slate-500 ">
            {{ product.title }}
            <div class="flex gap-1 mt-2">
                <img class="w-8 h-8 object-cover" v-for="(image, i) in product.images" :key="i" :src="image" alt="">
            </div>
        </td>
        <td class="border-b border-slate-100  p-4 text-slate-500 ">{{ product.description
        }}
        </td>
        <td class="border-b border-slate-100  p-4 pr-8 text-slate-500 ">{{ product.price
        }}</td>
    </tr>
</template>