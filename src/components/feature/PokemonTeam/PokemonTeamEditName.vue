<script setup lang="ts">
import { ref, computed } from 'vue'
import type { PokemonInterface } from '@/types/pokemon'
import type { TeamInterface } from '@/types/team'
import { useTeamStore } from '@/stores/teamStore'
import BaseButton from '@/components/base/BaseButton.vue'

import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'

const teamStore = useTeamStore()


// PROPS
const props = defineProps<{
  buttonText: string
}>()


// REF
const teamName = ref('')
const teamSubname = ref('')
const loading = ref(false)
const error = ref('')
const currentTeam = computed(() => teamStore.currentTeam)



// EMITS
const emit = defineEmits<{
  'team-created': []
  'team-updated': []
}>()


// FUNCTION
function submitForm() {
  console.log('Submitting form with teamName:', teamName.value, 'teamSubname:', teamSubname.value)
  if (!teamName.value) {
    error.value = 'Le nom de l\'équipe est requis'
  } else if (currentTeam?.value?.id) {
    updateTeam()
  } else {
    createTeam()
  }
}

function updateTeam() {
  loading.value = true

  teamStore.apiPutTeam({
    ...currentTeam.value,
    name: teamName.value ? teamName.value : currentTeam.value?.name,
    subname: teamSubname.value ? teamSubname.value : currentTeam.value?.subname,
  } as TeamInterface)
  .then(() => {
    teamName.value = ''
    teamSubname.value = ''
    emit('team-updated')
  })
  .catch(() => {
    // Error handling
  })
  .finally(() => {
    loading.value = false
    error.value = ''
  })
}

function createTeam() {
  loading.value = true
  
  teamStore.apiPostTeam({
    name: teamName.value,
    subname: teamSubname.value,
    pokemons: [] as PokemonInterface[],
    createdAt: new Date().toISOString(),
  } as TeamInterface)
  .then(() => {
    teamName.value = ''
    teamSubname.value = ''
    emit('team-created')
  })
  .catch(() => {
    // Error handling
  })
  .finally(() => {
    loading.value = false
    error.value = ''
  })
}
</script>

<template>

  <form @submit.prevent="submitForm">
    <Card>
      <CardContent>

        <FieldGroup>
          <Field>
            <FieldLabel for="pokemon-team-edit-name">
              Nom de l'équipe
            </FieldLabel>
            <InputGroup>
              <InputGroupInput 
                id="pokemon-team-edit-name"
                v-model="teamName"
                type="text"
                :placeholder="currentTeam?.name ? currentTeam.name : ''"
                @keyup.enter="submitForm"
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton>Rechercher par nom</InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </Field>
        </FieldGroup>

        <br>
        <FieldGroup>
          <Field>
            <FieldLabel for="pokemon-team-edit-subname">
              Sous-titre (optionnel)
            </FieldLabel>
            <InputGroup>
              <InputGroupInput 
                id="pokemon-team-edit-subname"
                v-model="teamSubname"
                type="text"
                :placeholder="currentTeam?.subname ? currentTeam.subname : ''"
                @keyup.enter="submitForm"
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton>Rechercher par identifiant</InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </Field>
        </FieldGroup>

      </CardContent>

      <CardFooter>
        <br>
        <div v-if="error" class="error">{{ error }}</div>
        <BaseButton type="submit" :disabled="loading">
          {{ loading ? 'Création en cours...' : props.buttonText }}
        </BaseButton>
      </CardFooter>

    </Card>
  </form>

</template>

<style scoped>
.form-container {
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.team-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: #333;
  font-size: 1rem;
}

.input {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.2s;
}

.input:focus {
  outline: none;
  border-color: #42b983;
  box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.1);
}

.input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.error {
  padding: 1rem;
  background-color: #fee;
  color: #c33;
  border-radius: 8px;
  font-size: 0.95rem;
}

.success {
  padding: 1rem;
  background-color: #e8f5e9;
  color: #2e7d32;
  border-radius: 8px;
  font-size: 0.95rem;
}
</style>
