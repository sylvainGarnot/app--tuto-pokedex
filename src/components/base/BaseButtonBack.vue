<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useRouter } from 'vue-router'

const router = useRouter()

function goBack() {
  router.back()
}
</script>

<template>
  <Button class="base-button" @click="goBack" variant="outline" size="lg">
    <slot>
      ← Retour
    </slot>
  </Button>
</template>

<style scoped lang="scss">
</style>
