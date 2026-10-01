<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router'
import type { TeamInterface } from '@/types/team'
import type { PokemonInterface } from '@/types/pokemon'
import { useTeamStore } from '@/stores/teamStore'

import PokemonTeamEditPokemons from '@/components/feature/PokemonTeam/PokemonTeamEditPokemons.vue'
import BaseButton from '@/components/base/BaseButton.vue'


// STORE
const teamStore = useTeamStore()
const currentTeam = computed(() => teamStore.currentTeam as TeamInterface)
const router = useRouter()


// FUNCTION
function updateTeamPokemons(pokemons: PokemonInterface[]) {
  if (!pokemons || !Array.isArray(pokemons)) {
    // error
    return
  }
  teamStore.setCurrentTeam({
    ...currentTeam.value,
    pokemons,
  })
  router.push({ name: 'team-create-resume' })
}
</script>

<template>
  <main>
    <PokemonTeamEditPokemons 
      :pokemons="currentTeam?.pokemons as PokemonInterface[]"
      @submit="(pokemons) => updateTeamPokemons(pokemons)"
      cancel-button-text="Annuler"
      submit-button-text="Confirmer"
    />

    <br>
    <BaseButton @click="router.push({ name: 'team-create-add-name' })" variant="outline">
      Étape précédente
    </BaseButton>
  </main>
</template>

<style scoped lang="scss">
</style>
