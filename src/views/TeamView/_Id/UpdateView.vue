<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { onMounted, computed } from 'vue'

import { useTeamStore } from '@/stores/teamStore'
import type { PokemonInterface } from '@/types/pokemon'
import type { TeamInterface } from '@/types/team'

import PokemonTeamEditName from '@/components/feature/PokemonTeam/PokemonTeamEditName.vue'
import PokemonTeamEditPokemons from '@/components/feature/PokemonTeam/PokemonTeamEditPokemons.vue'
import PokemonTeamDelete from '@/components/feature/PokemonTeam/PokemonTeamDelete.vue'


// VAR
const route = useRoute()
const router = useRouter()


// STORE
const teamStore = useTeamStore()
const team = computed(() => teamStore.teams.find((t: TeamInterface) => t.id === route.params.id))


// MOUNTED
onMounted(() => {
  // console.log('Mounted UpdateView for team ID:')

  if (!route.params.id) {
    // error message : ID de l'équipe manquant
    // console.log('ID de l\'équipe manquant')
    return
  }

  if (!teamStore.teams.length) {
    // console.log('Récupération des équipes depuis l\'API')
    teamStore.apiGetTeams()
  }
})


// FUNCTION
function updateTeamName(name: string, subname: string) {
  // loading.value = true
  teamStore.apiPutTeam({
    ...team.value,
    name: name ? name : team.value?.name,
    subname: subname ? subname : team.value?.subname,
  } as TeamInterface)
  .then(() => {
    // Team updated successfully
  })
  .catch(() => {
    // Error handling
  })
  .finally(() => {
    // loading.value = false
  })
}

function updateTeamPokemons(pokemons: PokemonInterface[]) {
  // loading.value = true
  teamStore.apiPutTeam({
    ...team.value,
    pokemons: pokemons,
  } as TeamInterface)
  .then(() => {
    // Team updated successfully
  })
  .catch(() => {
    // Error handling
  })
  .finally(() => {
    // loading.value = false
  })
}


function deleteTeam() {
  if (team.value) {
    teamStore.apiDeleteTeam(team.value.id).then(() => {
      router.push({ name: 'home' })
    })
  }
}

</script>

<template>
  <main>
    <div v-if="route.params.id && team?.id">
      
      <PokemonTeamEditName
        :name="team?.name"
        :subname="team?.subname"
        @submit="(name, subname) => updateTeamName(name, subname)"
        cancel-button-text="Annuler"
        submit-button-text="Valider" />

      <br>
      <PokemonTeamEditPokemons 
        :pokemons="team?.pokemons as PokemonInterface[]"
        @submit="(pokemons) => updateTeamPokemons(pokemons)"
        cancel-button-text="Annuler"
        submit-button-text="Valider" />

      <br>
      <PokemonTeamDelete @confirm="deleteTeam" /> 
      
    </div>
  </main>
</template>

<style scoped>
</style>
