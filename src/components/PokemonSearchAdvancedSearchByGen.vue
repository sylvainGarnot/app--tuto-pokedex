<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import type { Pokemon, PokemonType } from '../types/pokemon'
import { POKEAPI_URL } from '@/constant';


// PROPS
const props = defineProps({
  generation: String,
})


// EMITS
const emit = defineEmits<{
  'search': [Pokemon[]]
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
function searchByGeneration() {
  if (!selectedGeneration.value) {
    emit('search', [])
    return
  }

  loading.value = true
  error.value = ''
  emit('update:generation', selectedGeneration.value)

  const url = `${POKEAPI_URL}/pokemon/generation/${selectedGeneration.value}`

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const result = [] as Pokemon[]
      for (let index = 0; index < data.length; index++) {
        result.push({
          id: data[index].id || '',
          pokedexId: data[index].pokedexId,
          name: data[index].name,
          image: data[index].image,
          sprite: data[index].sprite,
          types: data[index].apiTypes.map((type: PokemonType) => ({
            name: type.name,
            image: type.image,
          })),
        })
      }
      emit('search', result)
    })
    .catch(() => {
      error.value = 'Erreur lors de la recherche'
      emit('search', [])
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <div class="search-container">
    <div class="input-group">
      <label for="generation">Génération</label>
      <select
        id="generation"
        v-model="selectedGeneration"
        class="search-input"
      >
        <option value="">Sélectionnez une génération...</option>
        <option v-for="gen in generations" :key="gen" :value="gen">
          {{ gen }}
        </option>
      </select>
    </div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="loading" class="load">Chargement...</div>
  </div>
</template>

<style scoped>
.error {
  background-color: #fee;
  color: #c33;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.load {
  color: #666;
  padding: 1rem;
  text-align: center;
  font-weight: 500;
}

.search-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  width: 100%;
}

label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
  font-size: 0.9rem;
}

.search-input {
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
}
</style>
