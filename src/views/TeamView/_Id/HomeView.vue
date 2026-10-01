<script setup lang="ts">
import { useRoute } from 'vue-router'

import { onMounted, computed } from 'vue'
import { useTeamStore } from '@/stores/teamStore'
import type { TeamInterface } from '@/types/team'

import PokemonTeamDetail from '@/components/feature/PokemonTeam/PokemonTeamDetail.vue'


// VAR
const route = useRoute()


// STORE
const teamStore = useTeamStore()
const team = computed(() => teamStore.teams.find((t: TeamInterface) => t.id === route.params.id))


// MOUNTED
onMounted(() => {
  if (!route.params.id) {
    // error message : ID de l'équipe manquant
    return
  }

  if (!teamStore.teams.length) {
    teamStore.apiGetTeams()
  }
})

</script>

<template>
  <main>
    <PokemonTeamDetail :team="team" />
  </main>
</template>

<style scoped>
</style>
