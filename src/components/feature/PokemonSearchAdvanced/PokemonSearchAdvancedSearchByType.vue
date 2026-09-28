<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import type { Pokemon } from '@/types/pokemon'
import { useTypeStore } from '@/stores/typeStore'
import { getPokemon } from '@/composables/usePokemon'
import { POKEAPI_URL } from '@/constant'


// PROPS
const props = defineProps({
  type1: String,
  type2: String,
})


// EMITS
const emit = defineEmits<{
  'search': [Pokemon[]]
  'update:type1': [string]
  'update:type2': [string]
}>()


// DATA
const typeStore = useTypeStore()
const loading = ref(false)
const error = ref('')


// ON MOUNTED
onMounted(() => {
  if (typeStore.types.length === 0) {
    typeStore.apiGetTypes()
  }
})


// FUNCTIONS

function fetchTypePokemonNames(typeName: string): Promise<string[]> {
  return fetch(`${POKEAPI_URL}/type/${typeName}`)
    .then((response) => response.json())
    .then((data: { pokemon?: { pokemon?: { name?: string } }[] }) =>
      (data.pokemon ?? [])
        .map((entry) => entry.pokemon?.name)
        .filter((name): name is string => Boolean(name)),
    )
}

async function searchByType() {
  if (!props.type1) {
    emit('search', [])
    return
  }

  loading.value = true
  error.value = ''

  try {
    let names = await fetchTypePokemonNames(props.type1)

    if (props.type2) {
      const names2 = await fetchTypePokemonNames(props.type2)
      names = names.filter((name) => names2.includes(name))
    }

    const pokemons = await Promise.all(names.map((name) => getPokemon(name)))
    emit('search', pokemons.filter((pokemon): pokemon is Pokemon => pokemon !== null))
  } catch (err) {
    error.value = 'Erreur lors de la recherche'
    console.error('Erreur:', err)
    emit('search', [])
  } finally {
    loading.value = false
  }
}


// WATCHERS
watch(() => props.type1, () => {
  searchByType()
})

watch(() => props.type2, () => {
  searchByType()
})

</script>

<template>
  <div class="search-container">
    <div class="input-group">
      <label for="type1">Type 1</label>
      <div class="type-select-wrapper">
        <select
          id="type1"
          :value="props.type1"
          @change="emit('update:type1', ($event.target as HTMLSelectElement).value)"
          class="search-input"
        >
          <option value="">Sélectionnez un type...</option>
          <option v-for="pokemonType in typeStore.types" :key="pokemonType.name" :value="pokemonType.name">
            {{ pokemonType.name }}
          </option>
        </select>
        <img v-if="props.type1" :src="typeStore.types.find(t => t.name === props.type1)?.icons?.symbol_icon" :alt="props.type1" class="type-image" />
      </div>
    </div>
    <div class="input-group">
      <label for="type2">Type 2</label>
      <div class="type-select-wrapper">
        <select
          id="type2"
          :value="props.type2"
          @change="emit('update:type2', ($event.target as HTMLSelectElement).value)"
          class="search-input"
          :disabled="!props.type1"
        >
          <option value="">Sélectionnez un type...</option>
          <option v-for="pokemonType in typeStore.types" :key="pokemonType.name" :value="pokemonType.name">
            {{ pokemonType.name }}
          </option>
        </select>
        <img v-if="props.type2" :src="typeStore.types.find(t => t.name === props.type2)?.icons?.symbol_icon" :alt="props.type2" class="type-image" />
      </div>
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

.type-select-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
}

.search-input:disabled {
  background-color: #f5f5f5;
  color: #999;
  cursor: not-allowed;
}

.type-image {
  position: absolute;
  right: 0.75rem;
  width: 24px;
  height: 24px;
  object-fit: contain;
  pointer-events: none;
}
</style>
