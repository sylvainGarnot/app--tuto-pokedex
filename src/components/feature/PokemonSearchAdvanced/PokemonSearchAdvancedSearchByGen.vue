<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import type { PokemonInterface } from '@/types/pokemon'
import { getPokemon } from '@/composables/usePokemon'
import { POKEAPI_URL } from '@/constant';

import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'

// PROPS
const props = defineProps({
  generation: String,
})


// EMITS
const emit = defineEmits<{
  'search': [PokemonInterface[]]
  'update:generation': [string]
}>()


// DATA
const generations = ref(['1', '2', '3', '4', '5', '6', '7', '8'] as string[])
const selectedGeneration = ref<string | null>(null)
const loading = ref(false)
const error = ref('')


// ON MOUNTED
onMounted(() => {
  if (props.generation) {
    const foundGen = generations.value.find((g) => g === props.generation)
    if (foundGen) {
      selectedGeneration.value = foundGen
      searchByGeneration()
    }
  }
})


// WATCHERS
watch(() => selectedGeneration.value, () => {
  searchByGeneration()
})


// FUNCTIONS
async function searchByGeneration() {
  if (!selectedGeneration.value) {
    emit('search', [])
    return
  }

  loading.value = true
  error.value = ''
  emit('update:generation', selectedGeneration.value)

  try {
    const names = await fetch(`${POKEAPI_URL}/generation/${selectedGeneration.value}`)
      .then((response) => response.json())
      .then((data: { pokemon_species?: { name?: string }[] }) =>
        (data.pokemon_species ?? [])
          .map((species) => species.name)
          .filter((name): name is string => Boolean(name)),
      )

    const pokemons = await Promise.all(names.map((name) => getPokemon(name)))
    emit('search', pokemons.filter((pokemon): pokemon is PokemonInterface => pokemon !== null))
  } catch (err) {
    error.value = 'Erreur lors de la recherche'
    console.error('Erreur:', err)
    emit('search', [])
  } finally {
    loading.value = false
  }
}
</script>

<template>

  <FieldGroup>
    <Field>
      <FieldLabel for="search-by-gen-native-select">
        Sélectionnez une génération
      </FieldLabel>
      <NativeSelect id="search-by-gen-native-select" v-model="selectedGeneration">
        <NativeSelectOption value="">
          Sélectionnez une génération...
        </NativeSelectOption>
        <NativeSelectOption v-for="g in generations" :key="g" :value="g">
          Génération n°{{ g }}
        </NativeSelectOption>
      </NativeSelect>
    </Field>
  </FieldGroup>


  <div v-if="error">{{ error }}</div>
  <div v-if="loading">Chargement...</div>
</template>

<style scoped>
</style>
