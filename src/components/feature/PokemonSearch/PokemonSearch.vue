<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import type { PokemonInterface } from '@/types/pokemon'
import { getPokemon } from '@/composables/usePokemon'
import BaseButton from '@/components/base/BaseButton.vue'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'
import { SearchIcon } from '@lucide/vue'

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

  <Card>
    <CardContent>

      <InputGroup>
        <InputGroupInput 
          id="id"
          v-model="inputId"
          type="text"
          placeholder="Entrez l'ID..."
          @keyup.enter="searchPokemon"
        />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <InputGroupButton>Search by ID</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <br>
      <InputGroup>
        <InputGroupInput 
          id="name"
          v-model="inputName"
          type="text"
          placeholder="Entrez le nom..."
          @keyup.enter="searchPokemon"
        />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <InputGroupButton>Search by Name</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>

    </CardContent>

    <CardFooter>
      <div v-if="error" class="error">{{ error }}</div>
      <BaseButton @click="searchPokemon" :disabled="loading">
        {{ loading ? 'Recherche...' : 'Rechercher' }}
      </BaseButton>
    </CardFooter>
  </Card>

</template>

<style scoped>
</style>
