<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Pokemon } from '@/types/pokemon'
import BaseButtonBack from '@/components/base/BaseButtonBack.vue'
import PokemonSearchAdvancedSearchByType from '@/components/feature/PokemonSearchAdvanced/PokemonSearchAdvancedSearchByType.vue'
import PokemonSearchAdvancedSearchByGen from '@/components/feature/PokemonSearchAdvanced/PokemonSearchAdvancedSearchByGen.vue'
import PokemonDetailSquare from '@/components/feature/PokemonDetail/PokemonDetailSquare.vue'


const route = useRoute()
const router = useRouter()


// DATA
const resultsByType = ref<Pokemon[]>([])
const resultsByGen = ref<Pokemon[]>([])


// COMPUTED
const results = computed(() => {
  const hasTypeResults = resultsByType.value && resultsByType.value.length > 0
  const hasGenResults = resultsByGen.value && resultsByGen.value.length > 0

  // Aucun résultat
  if (!hasTypeResults && !hasGenResults) {
    return []
  }

  // Uniquement résultats par type
  if (!hasGenResults) {
    return resultsByType.value
  }

  // Uniquement résultats par génération
  if (!hasTypeResults) {
    return resultsByGen.value
  }

  // Les deux ont des résultats - faire l'intersection
  const typeSet = new Set(resultsByType.value.map(p => p.id))
  return resultsByGen.value.filter(p => typeSet.has(p.id))
})

</script>

<template>
  <main>
    <BaseButtonBack />
    <h1>Recherche avancée</h1>

    <div class="search-advanced-container">

      <div class="search-section">
        <div class="search-content">
          <PokemonSearchAdvancedSearchByType
            :type1="route.query.type1 ? route.query.type1 as string : ''"
            :type2="route.query.type2 ? route.query.type2 as string : ''"
            @update:type1="(input: string) => router.push({ query: { type1: input, type2: route.query.type2, generation: route.query.generation } })"
            @update:type2="(input: string) => router.push({ query: { type1: route.query.type1, type2: input, generation: route.query.generation } })"
            @search="(value: Pokemon[]) => resultsByType = value"
          />
        </div>

        <div class="search-content">
          <PokemonSearchAdvancedSearchByGen
            :generation="route.query.generation ? route.query.generation as string : ''"
            @update:generation="(input: string) => router.push({ query: { generation: input, type1: route.query.type1, type2: route.query.type2 } })"
            @search="(value: Pokemon[]) => resultsByGen = value"
          />
        </div>
      </div>

      <div v-if="results && results.length > 0" class="results-grid">
        <PokemonDetailSquare v-if="results && results.length > 0" :pokemons="results" />
      </div>
    </div>
  </main>
</template>

<style scoped>
.search-section {
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.search-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
