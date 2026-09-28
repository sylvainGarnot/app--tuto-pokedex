<script setup lang="ts">
import { useRoute } from 'vue-router'
import PokemonTeamDetail from '@/components/feature/PokemonTeam/PokemonTeamDetail.vue'

const route = useRoute()

</script>

<template>
  <main>
    <PokemonTeamDetail
      v-if="route.params.id" 
      :id="(route.params.id as string)"
    />
  </main>
</template>

<style scoped>
</style>
