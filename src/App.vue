<script setup lang="ts">
import { RouterView } from 'vue-router'
import DashboardHeader from '@/components/DashboardHeader.vue'
</script>

<template>
  <DashboardHeader />
  <div class="container mx-auto">
    <RouterView />
  </div>
</template>

<style scoped></style>
