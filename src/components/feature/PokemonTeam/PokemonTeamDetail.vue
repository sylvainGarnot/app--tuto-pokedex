<script setup lang="ts">
import { onMounted, computed } from 'vue'
import BaseRouterLink from '@/components/base/BaseRouterLink.vue'
import { formatDate } from '@/utils/dateFormatter'
import type { TeamInterface } from '@/types/team'
import PokemonTeamPokemons from '@/components/feature/PokemonTeam/PokemonTeamPokemons.vue'
import { useTeamStore } from '@/stores/teamStore'

import { Card, CardContent } from '@/components/ui/card'


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

  <Card>
    <CardContent>

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
      <PokemonTeamPokemons :team="currentTeam" />

    </CardContent>
  </Card>

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

</style>
