<script lang="ts" setup>
import DashboardLogo from '@/components/DashboardLogo.vue'
import DashboardNavigation from '@/components/DashboardNavigation.vue'
</script>

<template>
    <header class="container mx-auto py-10 flex items-center justify-between border-b-2 border-b-green-500 mb-10">
        <DashboardLogo />
        <DashboardNavigation />
    </header>
</template>