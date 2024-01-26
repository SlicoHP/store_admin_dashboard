<script lang="ts" setup>

</script>

<template>
    <nav>
        <ul class="flex">
            <li class="mr-8">
                <RouterLink class="hover:text-green-600 transition-colors" :to="{ name: 'home' }">Home</RouterLink>
            </li>
            <li>
                <RouterLink class="hover:text-green-600 transition-colors" :to="{ name: 'products' }">Products</RouterLink>
            </li>
        </ul>
    </nav>
</template>

<style scoped>
.router-link-active.router-link-exact-active {
    @apply text-green-600;
}
</style>