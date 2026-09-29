<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>

<template>
  <main>
    <Button class="base-button">
      <slot>
      </slot>
    </Button>
  </main>
</template>

<style scoped lang="scss">

.base-button {
  cursor: pointer;
}

</style>