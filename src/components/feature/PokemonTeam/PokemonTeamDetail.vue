<script setup lang="ts">
import { onMounted, computed } from 'vue'
import BaseRouterLink from '@/components/base/BaseRouterLink.vue'
import { formatDate } from '@/utils/dateFormatter'
import type { TeamInterface } from '@/types/team'
import PokemonDetailSimple from '@/components/feature/PokemonDetail/PokemonDetailSimple.vue'
import { useTeamStore } from '@/stores/teamStore'


// PROPS
const props = defineProps<{
  id: string,
  isReadonly?: boolean
}>()


// STORE
const teamStore = useTeamStore()
const currentTeam = computed(() => teamStore.currentTeam)


// MOUNTED
onMounted(() => {
  const foundTeam = teamStore.teams.find((t: TeamInterface) => t.id === props.id)
  if (foundTeam) {
    teamStore.setCurrentTeam(foundTeam as TeamInterface)
  } else {
    teamStore.apiGetTeam(props.id)
  }
})

</script>

<template>
  <div class="team-wrapper">

    <!-- Informations de l'équipe -->
    <div class="team-info" v-if="currentTeam">
      <div class="team-info-header">
        <div>
          <h1>Équipe {{ currentTeam.name }}</h1>
          <p v-if="currentTeam.subname"><strong>Sous-titre :</strong> {{ currentTeam.subname }}</p>
          <p><strong>Créée le :</strong> {{ formatDate(currentTeam.createdAt) }}</p>
          <p v-if="currentTeam.updatedAt"><strong>Dernier update :</strong> {{ formatDate(currentTeam.updatedAt) }}</p>
        </div>
        <BaseRouterLink v-if="currentTeam?.id && !props.isReadonly" :to="{ name: 'team-update', params: { id: currentTeam.id } }" class="update-button">
          ✏️
        </BaseRouterLink>
      </div>
    </div>

    <!-- Équipe actuelle -->
    <div class="team-section" v-if="currentTeam">
      <h2>Mon équipe ({{ currentTeam.pokemons.length }}/ 6)</h2>

      <div class="pokemons-container">
        <div v-if="currentTeam.pokemons.length === 0" class="empty-message">
          Aucun Pokémon dans l'équipe
        </div>

        <div v-for="pokemon in currentTeam.pokemons" :key="pokemon.id" class="pokemon-wrapper">
          <PokemonDetailSimple :pokemon="pokemon" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.team-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.team-info {
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.team-info-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}


.team-info strong {
  color: #666;
  font-weight: 600;
}

.update-button {
  padding: 0.75rem 1rem;
  background-color: #e8f5e9;
  color: #2e7d32;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.2s;
  white-space: nowrap;
  min-width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

.update-button:hover {
  background-color: #c8e6c9;
  border-color: #2e7d32;
}

.team-section {
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}


.pokemons-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.empty-message {
  text-align: center;
  color: #999;
  padding: 2rem 1rem;
  font-size: 0.95rem;
}

.pokemon-wrapper {
  position: relative;
  display: flex;
  gap: 1rem;
  align-items: center;
}

:deep(.pokemon-wrapper .result) {
  flex: 1;
  margin-top: 0;
  margin-bottom: 0;
}
</style>
