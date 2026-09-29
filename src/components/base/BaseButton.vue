<script setup lang="ts">
import { Button } from '@/components/ui/button'

defineProps<{
  variant?: 'default' | 'outline' | 'secondary' | 'destructive' | 'ghost'
}>()
</script>

<template>
  <Button class="base-button" :variant="variant" size="lg">
    <slot>
    </slot>
  </Button>
</template>

<style scoped lang="scss">
</style>