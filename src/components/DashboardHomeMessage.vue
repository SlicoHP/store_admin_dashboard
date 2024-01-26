<script lang="ts" setup>

</script>

<template>
    <h1 class="text-5xl">👋 Hello John Doe</h1>
    <p class="mt-12">Check your latest <RouterLink :to="{ name: 'products' }" class="text-green-600">
            products
        </RouterLink>
        or create new ones!</p>
</template>