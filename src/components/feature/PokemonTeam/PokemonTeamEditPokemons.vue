<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTeamStore } from '@/stores/teamStore'
import PokemonSearch from '@/components/feature/PokemonSearch/PokemonSearch.vue'
import PokemonDetailSimple from '@/components/feature/PokemonDetail/PokemonDetailSimple.vue'
import type { PokemonInterface } from '@/types/pokemon'
import type { TeamInterface } from '@/types/team'
import BaseButton from '@/components/base/BaseButton.vue'

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
  <main v-if="currentTeam">
    <div class="add-pokemon-container">

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
      <div class="team-section">
        <h2>Mon équipe ({{ currentTeam.pokemons.length }}/6)</h2>

        <div class="pokemons-container">
          <div v-if="currentTeam.pokemons.length === 0" class="empty-message">
            Aucun Pokémon dans l'équipe
          </div>

          <div v-for="pokemon in currentTeam.pokemons" :key="pokemon.id" class="pokemon-item">
            <PokemonDetailSimple :pokemon="pokemon" />
            <BaseButton @click="removePokemon(pokemon.id)" variant="destructive">
              ✕ Retirer
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.add-pokemon-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  width: 100%;
  box-sizing: border-box;
  min-width: 0;
}

.search-section {
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-sizing: border-box;
  min-width: 0;
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

.team-section {
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  min-width: 0;
}

.pokemons-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.empty-message {
  text-align: center;
  color: #999;
  padding: 2rem 1rem;
  font-size: 0.95rem;
}

.pokemon-item {
  display: flex;
  gap: 1rem;
  align-items: center;
}

:deep(.pokemon-item .result) {
  flex: 1;
  margin-top: 0;
  margin-bottom: 0;
}

</style>
