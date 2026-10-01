<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import { createEmptyTeam, type TeamInterface } from '@/types/team'
import { useTeamStore } from '@/stores/teamStore'

import PokemonTeamEditName from '@/components/feature/PokemonTeam/PokemonTeamEditName.vue'
import BaseButton from '@/components/base/BaseButton.vue'


// STORE
const teamStore = useTeamStore()
const currentTeam = computed(() => teamStore.currentTeam as TeamInterface)
const router = useRouter()


onMounted(() => {
  if (!teamStore.currentTeam) {
    teamStore.setCurrentTeam(createEmptyTeam())
  }
})


// FUNCTION
function updateTeamName(name: string, subname: string) {
  if (!name) {
    // error
    return
  }
  teamStore.setCurrentTeam({
    ...currentTeam.value,
    name,
    subname,
  })
  router.push({ name: 'team-create-add-pokemons' })
}


</script>

<template>
  <main>
    <PokemonTeamEditName
      :name="currentTeam?.name"
      :subname="currentTeam?.subname"
      @submit="(name, subname) => updateTeamName(name, subname)"
      cancel-button-text="Annuler"
      submit-button-text="Confirmer"
    />

    <br>
    <BaseButton @click="router.push({ name: 'home' })" variant="outline">
      Revenir à l'accueil
    </BaseButton>
  </main>
</template>

<style scoped>
</style>
