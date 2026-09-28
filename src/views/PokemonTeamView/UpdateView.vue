<script setup lang="ts">
import { useRoute } from 'vue-router'
import PokemonTeamUpdate from '@/components/PokemonTeamUpdate.vue'
import BaseButtonBack from '@/components/base/BaseButtonBack.vue'

const route = useRoute()

</script>

<template>
  <main>
    <BaseButtonBack />
    <PokemonTeamUpdate v-if="route.params.id" :id="(route.params.id as string)" />
  </main>
</template>

<style scoped>
</style>
