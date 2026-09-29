<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import BaseButtonBack from '@/components/base/BaseButtonBack.vue'
import PokemonDetail from '@/components/feature/PokemonDetail/PokemonDetail.vue'
import { createEmptyPokemon, type PokemonInterface } from '@/types/pokemon'
import { useTeamStore } from '@/stores/teamStore'
import { getPokemon } from '@/composables/usePokemon'

const route = useRoute()
const teamStore = useTeamStore()

const pokemon = ref<PokemonInterface | null>(createEmptyPokemon())
const loading = ref(true)
const error = ref('')


// MOUNTED
onMounted(async () => {
  pokemon.value = await apiGetPokemon()
})


// FUNCTION
async function apiGetPokemon(): Promise<PokemonInterface | null> {
  loading.value = true

  const id = route.params.id as string

  // recherche dans le store
  for (const team of teamStore.teams) {
    const foundInTeam = team.pokemons.find((p: PokemonInterface) => p.id.toString() === id)
    if (foundInTeam) {
      loading.value = false
      return foundInTeam as PokemonInterface
    }
  }

  // Si non trouvé dans le store, fetch depuis l'API
  return getPokemon(id)
    .catch((err) => {
      error.value = 'Erreur lors du chargement du Pokémon'
      console.error('Erreur:', err)
      return null
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <main>
    <BaseButtonBack />
    <PokemonDetail :pokemon="pokemon" :loading="loading" :error="error">
    </PokemonDetail>
  </main>
</template>

<style scoped>
</style>
