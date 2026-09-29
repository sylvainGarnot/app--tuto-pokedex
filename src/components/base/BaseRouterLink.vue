<script setup lang="ts">
import { Button } from '@/components/ui/button'
import type { RouteLocationRaw } from 'vue-router'


// PROPS
defineProps<{
  to: RouteLocationRaw
}>()

</script>

<template>
  <Button class="base-button" as-child variant="outline" size="lg" >
    <RouterLink :to="to">
      <slot>
      </slot>
    </RouterLink>
  </Button>
</template>

<style scoped lang="scss">
</style>