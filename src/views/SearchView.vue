<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { PokemonInterface } from '@/types/pokemon'
import BaseButtonBack from '@/components/base/BaseButtonBack.vue'
import PokemonSearch from '@/components/feature/PokemonSearch/PokemonSearch.vue'
import PokemonDetailSimple from '@/components/feature/PokemonDetail/PokemonDetailSimple.vue'

const route = useRoute()
const router = useRouter()


// DATA
const pokemonResult = ref<PokemonInterface | null>(null)


// FUNCTIONS
function handleSearch(newResult: PokemonInterface | null) {
  pokemonResult.value = newResult
  router.push({ query: { name: pokemonResult.value ? pokemonResult.value.name : '' } })
}

</script>

<template>
  
  <main>

    <BaseButtonBack />
    <h1>Recherche Pokémon</h1>
    <PokemonSearch
      :id="(route.query.id as string)"
      :name="(route.query.name as string)"
      @search="(event) => { handleSearch(event) }" />
    <br>
    <PokemonDetailSimple
      v-if="pokemonResult && pokemonResult.id"
      :pokemon="pokemonResult" />
  
  </main>

</template>

<style scoped>
</style>