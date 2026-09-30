<script setup lang="ts">
import { useRoute } from 'vue-router'

import PokemonTeamEditName from '@/components/feature/PokemonTeam/PokemonTeamEditName.vue'
import PokemonTeamEditPokemons from '@/components/feature/PokemonTeam/PokemonTeamEditPokemons.vue'
import PokemonTeamDelete from '@/components/feature/PokemonTeam/PokemonTeamDelete.vue'

const route = useRoute()

</script>

<template>
  <main>
    <div v-if="route.params.id" class="pokemon-team-update">
      
      <PokemonTeamEditName :button-text="'Valider'" />

      <br>
      <PokemonTeamEditPokemons :button-text="'Valider'" />

      <br>
      <PokemonTeamDelete /> 
      
    </div>
  </main>
</template>

<style scoped>
</style>
