<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTeamStore } from '@/stores/teamStore'

import type { PokemonInterface } from '@/types/pokemon'
import type { TeamInterface } from '@/types/team'

import PokemonSearch from '@/components/feature/PokemonSearch/PokemonSearch.vue'
import PokemonDetailSimple from '@/components/feature/PokemonDetail/PokemonDetailSimple.vue'
import PokemonTeamPokemons from '@/components/feature/PokemonTeam/PokemonTeamPokemons.vue'

import BaseButton from '@/components/base/BaseButton.vue'

import { Card, CardContent } from '@/components/ui/card'


const teamStore = useTeamStore()


// DATA & STORE
const currentTeam = computed(() => teamStore.currentTeam)
const searchResult = ref<PokemonInterface | null>(null)
const alertMessage = ref('')
const loading = ref(false)


// FUNCTIONS
function handleSearchResult(result: PokemonInterface | null) {
  searchResult.value = result
  alertMessage.value = ''
}


function addPokemonToTeam() {
  if (!searchResult.value || !currentTeam.value) return

  if (currentTeam.value.pokemons.length >= 6) {
    alertMessage.value = 'Équipe complète (6 Pokémons max)'
    return
  }

  if (currentTeam.value.pokemons.some(p => p.id === searchResult.value?.id)) {
    alertMessage.value = 'Ce Pokémon est déjà dans l\'équipe'
    return
  }

  loading.value = true
  alertMessage.value = ''
  
  const newTeamPokemons = [...currentTeam.value.pokemons, searchResult.value]
  teamStore.apiPutTeam({
    ...currentTeam.value,
    pokemons: newTeamPokemons as PokemonInterface[],
  } as TeamInterface)
  .then(() => {
    alertMessage.value = `${searchResult?.value?.name} ajouté à l'équipe!`
  })
  .catch(() => {
    // Error handling
  })
  .finally(() => {
    loading.value = false
    setTimeout(() => {
      alertMessage.value = ''
    }, 2500)
  })
}

function removePokemon(pokemonId: number) {
  if (!currentTeam.value) return
  loading.value = true
  alertMessage.value = ''

  const newTeamPokemons = currentTeam.value.pokemons.filter(p => p.id !== pokemonId)
  teamStore.apiPutTeam({
    ...currentTeam.value,
    pokemons: newTeamPokemons as PokemonInterface[],
  } as TeamInterface)
    .then(() => {
      alertMessage.value = `Pokémon retiré de l'équipe`
    })
    .catch(() => {
      // Error handling
    })
    .finally(() => {
      loading.value = false
      setTimeout(() => {
        alertMessage.value = ''
      }, 2500)
    })
}
</script>

<template>
  <Card v-if="currentTeam">
    <CardContent class="add-pokemon-container">

      <!-- Section recherche -->
      <div class="search-section">
        <h2>Ajouter un Pokémon</h2>
        
        <PokemonSearch @search="handleSearchResult" />
        <PokemonDetailSimple v-if="searchResult" :pokemon="searchResult" />
        
        <div v-if="alertMessage" class="alert-message" :class="{ success: alertMessage.includes('ajouté') }">
          {{ alertMessage }}
        </div>
        
        <div v-if="searchResult" class="search-result-wrapper">
          <BaseButton @click="addPokemonToTeam">
            Ajouter
          </BaseButton>
        </div>
      </div>

      <!-- Section équipe actuelle -->
      <PokemonTeamPokemons :team="currentTeam" editable @removePokemon="removePokemon" />

    </CardContent>
  </Card>
</template>

<style scoped lang="scss">
.add-pokemon-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  .search-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}


.alert-message {
  padding: 1rem;
  border-radius: 8px;
  background-color: #fee;
  color: #c33;
  font-weight: 500;

  &.success {
    background-color: #e8f5e9;
    color: #2e7d32;
  }
}

.search-result-wrapper {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: flex-end;
  margin-top: 0.5rem;
  flex-wrap: wrap;
}

:deep(.search-result-wrapper .result) {
  flex: 1;
  margin-top: 0;
  margin-bottom: 0;
  min-width: 200px;
}

</style>
