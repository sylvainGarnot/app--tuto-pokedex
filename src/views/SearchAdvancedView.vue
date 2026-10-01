<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { PokemonInterface } from '@/types/pokemon'
import BaseButtonBack from '@/components/base/BaseButtonBack.vue'
import PokemonSearchAdvancedSearchByType from '@/components/feature/PokemonSearchAdvanced/PokemonSearchAdvancedSearchByType.vue'
import PokemonSearchAdvancedSearchByGen from '@/components/feature/PokemonSearchAdvanced/PokemonSearchAdvancedSearchByGen.vue'
import PokemonDetailSquare from '@/components/feature/PokemonDetail/PokemonDetailSquare.vue'

import { Card, CardContent } from '@/components/ui/card'


const route = useRoute()
const router = useRouter()


// DATA
const resultsByType = ref<PokemonInterface[]>([])
const resultsByGen = ref<PokemonInterface[]>([])


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


    <Card>
      <CardContent>
        <PokemonSearchAdvancedSearchByType
          :type1="route.query.type1 ? route.query.type1 as string : ''"
          :type2="route.query.type2 ? route.query.type2 as string : ''"
          @update:type1="(input: string) => router.push({ query: { type1: input, type2: route.query.type2, generation: route.query.generation } })"
          @update:type2="(input: string) => router.push({ query: { type1: route.query.type1, type2: input, generation: route.query.generation } })"
          @search="(value: PokemonInterface[]) => resultsByType = value"
        />
        <br>
        <PokemonSearchAdvancedSearchByGen
          :generation="route.query.generation ? route.query.generation as string : ''"
          @update:generation="(input: string) => router.push({ query: { generation: input, type1: route.query.type1, type2: route.query.type2 } })"
          @search="(value: PokemonInterface[]) => resultsByGen = value"
        />
      </CardContent>
    </Card>


    <br>
    <Card v-if="results && results.length > 0">
      <CardContent>
        <h2>{{ results.length }} Pokémon trouvé(s)</h2>
        <br>
        <div class="pokemon-grid">
          <PokemonDetailSquare v-for="pokemon in results" :key="pokemon.id" :pokemon="pokemon" />
        </div>
      </CardContent>
    </Card>

  </main>

</template>

<style scoped>
.pokemon-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;
}

@media (max-width: 1024px) {
  .pokemon-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 768px) {
  .pokemon-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 480px) {
  .pokemon-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
