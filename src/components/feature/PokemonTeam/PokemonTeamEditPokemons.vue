<script setup lang="ts">
import { ref, onUpdated } from 'vue'

import type { PokemonInterface } from '@/types/pokemon'

import PokemonSearch from '@/components/feature/PokemonSearch/PokemonSearch.vue'
import PokemonDetailSimple from '@/components/feature/PokemonDetail/PokemonDetailSimple.vue'
import PokemonTeamPokemons from '@/components/feature/PokemonTeam/PokemonTeamPokemons.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { Card, CardContent, CardFooter } from '@/components/ui/card'


// PROPS
const props = defineProps<{
  pokemons: PokemonInterface[]
  submitButtonText: string
  cancelButtonText: string
}>()


// EMITS
const emit = defineEmits<{
  submit: [
    pokemons: PokemonInterface[],
  ]
  cancel: []
}>()


// DATA
const pokemonFound = ref<PokemonInterface | null>(null)
const pokemonsInput = ref([...props.pokemons] as PokemonInterface[])



// ON UPDATED
onUpdated(() => {
  initInput()
})


// FUNCTIONS
function initInput() {
  pokemonsInput.value = [...props.pokemons] as PokemonInterface[]
}
function handleCancel() {
  initInput()
}
</script>

<template>
  <Card>
    <CardContent class="add-pokemon-container">

      <!-- Section recherche -->
      <div class="search-section">
        <h2>Ajouter un Pokémon</h2>
        
        <PokemonSearch @search="(data: PokemonInterface | null) => pokemonFound = data as PokemonInterface | null" />
        <PokemonDetailSimple v-if="pokemonFound" :pokemon="pokemonFound" />
        
        <div v-if="pokemonFound" class="search-result-wrapper">
          <BaseButton @click="pokemonsInput.push(pokemonFound as PokemonInterface)">Ajouter</BaseButton>
        </div>
      </div>

      <!-- Section équipe input -->
      <PokemonTeamPokemons
        :pokemons="pokemonsInput"
        editable
        @removePokemon="(pokemon: PokemonInterface) => pokemonsInput = pokemonsInput.filter(p => p.id !== pokemon.id)" />

    </CardContent>

    <CardFooter>
      <BaseButton @click="handleCancel()" variant="outline">
        {{ props.cancelButtonText }}
      </BaseButton>
      <BaseButton @click="emit('submit', pokemonsInput)">
        {{ props.submitButtonText }}
      </BaseButton>
    </CardFooter>

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
