<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTeamStore } from '@/stores/teamStore'
import PokemonTeamUpdateName from '@/components/feature/PokemonTeam/PokemonTeamUpdateName.vue'
import PokemonTeamUpdateAddPokemon from '@/components/feature/PokemonTeam/PokemonTeamUpdateAddPokemon.vue'

const router = useRouter()
const teamStore = useTeamStore()
const currentTeam = computed(() => teamStore.currentTeam)

function deleteTeam() {
  if (currentTeam.value && confirm('Êtes-vous sûr de vouloir supprimer cette équipe ?')) {
    teamStore.apiDeleteTeam(currentTeam.value.id).then(() => {
      router.push({ name: 'home' })
    })
  }
}

</script>

<template>
  <div class="pokemon-team-update">
    <PokemonTeamUpdateName :button-text="'Valider'" />
    <PokemonTeamUpdateAddPokemon :button-text="'Valider'" />
    
    <button v-if="currentTeam" @click="deleteTeam" class="btn-delete">
      Supprimer l'équipe
    </button>
  </div>
</template>

<style scoped>
.pokemon-team-update {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.btn-delete {
  padding: 0.75rem;
  background-color: #ff4444;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-delete:hover {
  background-color: #cc0000;
}
</style>
