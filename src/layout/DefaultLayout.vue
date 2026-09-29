<template>
  <TheHeader />
  <main id="main-content">
    <slot />
  </main>
  <TheFooter />
</template>

<script setup lang="ts">
import TheHeader from '@/layout/TheHeader.vue'
import TheFooter from '@/layout/TheFooter.vue'
</script>

<style scoped lang="scss">
#main-content {
  padding: 2rem;
  max-width: 1280px;
  margin: 0 auto;
  @media (max-width: 768px) {
    padding: 1rem;
  }
}
</style>
