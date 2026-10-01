<template>
  <DefaultLayout>
    <RouterView />
    <Toaster />
  </DefaultLayout>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import DefaultLayout from './layout/DefaultLayout.vue'

import 'vue-sonner/style.css'
import { Toaster } from '@/components/ui/sonner'
</script>



<style scoped lang="scss">
</style>
