<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goBack() {
  router.back()
}
</script>

<template>
  <main>
    <button class="back-button" @click="goBack">← Retour</button>
  </main>
</template>

<style scoped lang="scss">
.back-button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #f0f0f0;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-bottom: 2rem;

  &:hover {
    background-color: #e0e0e0;
  }
}
</style>
