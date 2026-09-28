<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import type { Pokemon, PokemonType } from '../types/pokemon'
import { POKEAPI_URL } from '@/constant';

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
const apiTypes = ref<PokemonType[]>([])
const loading = ref(false)
const error = ref('')


// ON MOUNTED
onMounted(() => {
  getApiTypes()
  //   .then(() => {
  //   if (props.type1) {
  //     const foundType1 = apiTypes.value.find((t) => t.name.toLowerCase() === props.type1?.toLowerCase())
  //     if (foundType1) emit('update:type1', foundType1.name)
  //   }
  //   if (props.type2) {
  //     const foundType2 = apiTypes.value.find((t) => t.name.toLowerCase() === props.type2?.toLowerCase())
  //     if (foundType2) emit('update:type2', foundType2.name)
  //   }

  //   if (props.type1 || props.type2) {
  //     searchByType()
  //   }
  // })
})


// FUNCTIONS
function getApiTypes() {
  return fetch(`${POKEAPI_URL}/types`)
    .then((response) => response.json())
    .then((data) => {
      apiTypes.value = data
    })
    .catch((err) => {
      console.error('Erreur lors du chargement des types:', err)
    })
}

function searchByType() {
  if (!props.type1 && !props.type2) {
    emit('search', [])
    return
  }

  loading.value = true

  let url: string
  if (props.type1 && props.type2) {
    url = `${POKEAPI_URL}/pokemon/types/${props.type1}/${props.type2}`
  } else {
    url = `${POKEAPI_URL}/pokemon/type/${props.type1}`
  }

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
          <option v-for="type in apiTypes" :key="type.name" :value="type.name">
            {{ type.name }}
          </option>
        </select>
        <img v-if="props.type1" :src="apiTypes.find(t => t.name === props.type1)?.image" :alt="props.type1" class="type-image" />
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
          <option v-for="type in apiTypes" :key="type.name" :value="type.name">
            {{ type.name }}
          </option>
        </select>
        <img v-if="props.type2" :src="apiTypes.find(t => t.name === props.type2)?.image" :alt="props.type2" class="type-image" />
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
