<script setup lang="ts">
import { useRouter } from 'vue-router'
import BaseButton from './BaseButton.vue'

const router = useRouter()

function goBack() {
  router.back()
}
</script>

<template>
  <main>
    <BaseButton @click="goBack">
      <slot>
        ← Retour
      </slot>
    </BaseButton>
  </main>
</template>

<style scoped lang="scss">
</style>
