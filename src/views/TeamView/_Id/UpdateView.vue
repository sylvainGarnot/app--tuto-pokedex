<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTeamStore } from '@/stores/teamStore'
import PokemonTeamEditName from '@/components/feature/PokemonTeam/PokemonTeamEditName.vue'
import PokemonTeamEditPokemons from '@/components/feature/PokemonTeam/PokemonTeamEditPokemons.vue'
import BaseButton from '@/components/base/BaseButton.vue'

const route = useRoute()
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
  <main>
    <div v-if="route.params.id" class="pokemon-team-update">
      
      <PokemonTeamEditName :button-text="'Valider'" />

      <PokemonTeamEditPokemons :button-text="'Valider'" />

      <BaseButton v-if="currentTeam" @click="deleteTeam" variant="destructive">
        Supprimer l'équipe
      </BaseButton>
      
    </div>
  </main>
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
