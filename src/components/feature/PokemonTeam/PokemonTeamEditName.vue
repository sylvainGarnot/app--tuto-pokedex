<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Pokemon, PokemonTeam } from '@/types/pokemon'
import { useTeamStore } from '@/stores/teamStore'

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
  if (currentTeam?.value?.id) {
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
  } as PokemonTeam)
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
    pokemons: [] as Pokemon[],
    createdAt: new Date().toISOString(),
  } as PokemonTeam)
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
  <main>
    <div class="form-container">
      <form @submit.prevent="submitForm" class="team-form">
        <div class="form-group">
          <label for="team-name">Nom de l'équipe</label>
          <input id="team-name" v-model="teamName" type="text" :placeholder="currentTeam?.name ? currentTeam.name : 'Ex: Équipe de feu'"
            class="input" />
        </div>
        <div class="form-group">
          <label for="team-subname">Sous-titre (optionnel)</label>
          <input id="team-subname" v-model="teamSubname" type="text" :placeholder="currentTeam?.subname ? currentTeam.subname : 'Ex: sous-titre de l\'équipe'"
            class="input" />
        </div>

        <div v-if="error" class="error">{{ error }}</div>

        <button type="submit" :disabled="loading" class="submit-button">
          {{ loading ? 'Création en cours...' : props.buttonText }}
        </button>
      </form>
    </div>
  </main>
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

.submit-button {
  padding: 0.75rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-button:hover:not(:disabled) {
  background-color: #369970;
}

.submit-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
