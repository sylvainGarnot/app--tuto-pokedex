<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import type { PokemonInterface } from '@/types/pokemon'
import { getPokemon } from '@/composables/usePokemon'
import BaseButton from '@/components/base/BaseButton.vue'

import { Card, CardContent } from '@/components/ui/card'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'
import { SearchIcon } from '@lucide/vue'

import { FieldGroup, FieldSet, Field, FieldLabel, FieldError } from '@/components/ui/field'

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
function validate() {
  if (!inputName.value.trim() && !inputId.value.trim()) {
    error.value = 'Le nom du Pokémon ou l\'ID est obligatoire.'
    return false
  }
  error.value = ''
  return true
}
function searchPokemon() {
  if (!validate()) {
    return
  }

  if (!inputId.value && !inputName.value) {
    error.value = 'Veuillez entrer un ID ou un nom'
    return
  }

  loading.value = true

  getPokemon(inputId.value || inputName.value)
    .then((result) => {
      if (result?.id) {
        emit('search', result)      
      } else {
        error.value = 'Pokémon non trouvé'
        emit('search', null)
      }
    })
    .catch((error) => {
      error.value = error.message || String(error)
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

      <form @submit.prevent="searchPokemon">
        <FieldGroup>
          <FieldSet>
            <FieldGroup>
              <Field :data-invalid="error ? true : undefined" >
                <FieldLabel for="pokemon-search-by-id">
                  ID du Pokémon
                </FieldLabel>
                <InputGroup>
                  <InputGroupInput 
                    id="id"
                    v-model="inputId"
                    type="text"
                    placeholder="Entrez l'ID..."
                    @keyup.enter="searchPokemon"
                    @input="error = ''"
                  />
                  <InputGroupAddon>
                    <SearchIcon />
                  </InputGroupAddon>
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton>Search by ID</InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </Field>
              <Field :data-invalid="error ? true : undefined" >
                <FieldLabel for="pokemon-search-by-name">
                  Nom du Pokémon
                </FieldLabel>
                <InputGroup>
                  <InputGroupInput 
                    id="name"
                    v-model="inputName"
                    type="text"
                    placeholder="Entrez le nom..."
                    @keyup.enter="searchPokemon"
                    @input="error = ''"
                  />
                  <InputGroupAddon>
                    <SearchIcon />
                  </InputGroupAddon>
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton>Search by Name</InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </Field>
            </FieldGroup>
          </FieldSet>
        <FieldError v-if="error">{{ error }}</FieldError>
        </FieldGroup>


        <br>
        <BaseButton @click="searchPokemon" :disabled="loading">
          {{ loading ? 'Recherche...' : 'Rechercher' }}
        </BaseButton>
        <br>

        
      </form>

    </CardContent>
  </Card>

</template>

<style scoped>
</style>
