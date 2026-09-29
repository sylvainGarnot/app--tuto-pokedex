<script setup lang="ts">
import { Button } from '@/components/ui/button'
import type { RouteLocationRaw } from 'vue-router'


// PROPS
defineProps<{
  to: RouteLocationRaw,
  variant?: 'default' | 'outline' | 'secondary' | 'destructive'
}>()


</script>

<template>
  <Button class="base-button" as-child :variant="variant" size="lg" >
    <RouterLink :to="to">
      <slot>
      </slot>
    </RouterLink>
  </Button>
</template>

<style scoped lang="scss">
</style>