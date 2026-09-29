<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import type { PokemonInterface } from '@/types/pokemon'
import { getPokemon } from '@/composables/usePokemon'
import BaseButton from '@/components/base/BaseButton.vue'

// DATA
const inputId = ref('')
const inputName = ref('')
const loading = ref(false)
const error = ref('')


// PROPS
const props = defineProps({
  id: String,
  name: String,
})


// EMITS
const emit = defineEmits<{
  'search': [PokemonInterface | null]
}>()


// MOUNTED
onMounted(() => {
  if (props.id) {
    inputId.value = props.id
    searchPokemon()
  } else if (props.name) {
    inputName.value = props.name
    searchPokemon()
  }
})

// WATCHERS
watch(inputId, (newValue) => {
  if (newValue) {
    inputName.value = ''
  }
})

watch(inputName, (newValue) => {
  if (newValue) {
    inputId.value = ''
  }
})


// FONCTIONS
function searchPokemon() {
  error.value = ''

  if (!inputId.value && !inputName.value) {
    error.value = 'Veuillez entrer un ID ou un nom'
    return
  }

  loading.value = true

  getPokemon(inputId.value || inputName.value)
    .then((result) => {
      emit('search', result)
    })
    .catch(() => {
      error.value = 'Erreur lors de la recherche'
      emit('search', null)
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <div class="search-container">
    <div class="input-group">
      <label for="id">ID</label>
      <input
        id="id"
        v-model="inputId"
        type="text"
        placeholder="Entrez l'ID..."
        class="search-input"
        @keyup.enter="searchPokemon"
      />
    </div>
    <div class="input-group">
      <label for="name">Nom</label>
      <input
        id="name"
        v-model="inputName"
        type="text"
        placeholder="Entrez le nom..."
        class="search-input"
        @keyup.enter="searchPokemon"
      />
    </div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>

  <BaseButton @click="searchPokemon" :disabled="loading">
    {{ loading ? 'Recherche...' : 'Rechercher' }}
  </BaseButton>
</template>

<style scoped>

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
}

</style>
