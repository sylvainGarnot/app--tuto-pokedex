<script setup lang="ts">
import PokemonTeamEditName from '@/components/feature/PokemonTeam/PokemonTeamEditName.vue'
import { onMounted } from 'vue';
import { useRouter } from 'vue-router'
import { useTeamStore } from '@/stores/teamStore'

const router = useRouter()
const teamStore = useTeamStore()


onMounted(() => {
  teamStore.clearCurrentTeam()
})
</script>

<template>
  <main>
    <PokemonTeamEditName @team-created="router.push({ name: 'createTeamAddPokemon' })" :button-text="'Étape suivante'" />
    
  </main>
</template>

<style scoped>
</style>
