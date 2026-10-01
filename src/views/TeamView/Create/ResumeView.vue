<script setup lang="ts">
import { computed } from 'vue'
import { useTeamStore } from '@/stores/teamStore'
import { useRouter } from 'vue-router'
import { createEmptyTeam, type TeamInterface } from '@/types/team'

import PokemonTeamDetail from '@/components/feature/PokemonTeam/PokemonTeamDetail.vue'

import BaseRouterLink from '@/components/base/BaseRouterLink.vue'
import BaseButton from '@/components/base/BaseButton.vue'

// STORE
const teamStore = useTeamStore()
const currentTeam = computed(() => teamStore.currentTeam)
const router = useRouter()


// FUNCTION
const handleConfirm = () => {
  
  teamStore.apiPostTeam({
    ...currentTeam.value,
  } as TeamInterface)
  .then(() => {
    // Success handling
    teamStore.setCurrentTeam({
      ...createEmptyTeam(),
    })
    router.push({ name: 'home' })
  })
  .catch(() => {
    // Error handling
  })
  .finally(() => {
    // Final handling
  })
}


</script>

<template>
  <main>
    <PokemonTeamDetail v-if="currentTeam" :team="currentTeam" isReadonly />

    <br>
    <BaseRouterLink :to="{ name: 'home' }" variant="outline">
      Annuler
    </BaseRouterLink>

    <br>
    <br>
    <BaseButton @click="handleConfirm()">
      Valider Équipe
    </BaseButton>
    
  </main>
</template>

<style scoped lang="scss">
</style>
