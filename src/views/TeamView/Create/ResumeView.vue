<script setup lang="ts">
import { computed } from 'vue'
import { useTeamStore } from '@/stores/teamStore'
import PokemonTeamDetail from '@/components/feature/PokemonTeam/PokemonTeamDetail.vue'
import BaseRouterLink from '@/components/base/BaseRouterLink.vue'

// STORE
const teamStore = useTeamStore()
const currentTeam = computed(() => teamStore.currentTeam)

</script>

<template>
  <main>
    <PokemonTeamDetail v-if="currentTeam?.id" :id="(currentTeam.id as string)" isReadonly />

    <BaseRouterLink v-if="currentTeam" :to="{ name: 'home' }">
      Retour à l'accueil
    </BaseRouterLink>
  </main>
</template>

<style scoped lang="scss">
</style>
