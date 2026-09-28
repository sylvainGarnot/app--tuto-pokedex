<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Pokemon } from '@/types/pokemon'
import PokemonSearchAdvancedSearchByType from '@/components/feature/PokemonSearchAdvanced/PokemonSearchAdvancedSearchByType.vue'
import PokemonSearchAdvancedSearchByGen from '@/components/feature/PokemonSearchAdvanced/PokemonSearchAdvancedSearchByGen.vue'
import PokemonSearchAdvancedResult from '@/components/feature/PokemonSearchAdvanced/PokemonSearchAdvancedResult.vue'


// PROPS
const props = defineProps({
  type1: String,
  type2: String,
  generation: String,
})


// EMITS
const emit = defineEmits<{
  'update:type1': [string]
  'update:type2': [string]
  'update:generation': [string]
}>()


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
  <div class="search-advanced-container">

    <div class="search-section">
      <div class="search-content">
        <PokemonSearchAdvancedSearchByType 
          :type1="(props.type1 as string)"
          :type2="(props.type2 as string)"
          @update:type1="(input: string) => emit('update:type1', input)"
          @update:type2="(input: string) => emit('update:type2', input)"
          @search="(value: Pokemon[]) => resultsByType = value"
        />
      </div>

      <div class="search-content">
        <PokemonSearchAdvancedSearchByGen 
          :generation="(props.generation as string)"
          @update:generation="(input: string) => emit('update:generation', input)"
          @search="(value: Pokemon[]) => resultsByGen = value"
        />
      </div>
    </div>

    <PokemonSearchAdvancedResult v-if="results && results.length > 0" :pokemons="results" />
  </div>
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
