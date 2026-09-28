<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTeamStore } from '@/stores/teamStore'
import PokemonTeamDetail from '@/components/feature/PokemonTeam/PokemonTeamDetail.vue'

const router = useRouter()

// STORE
const teamStore = useTeamStore()
const currentTeam = computed(() => teamStore.currentTeam)

</script>

<template>
  <main>
    <PokemonTeamDetail v-if="currentTeam?.id" :id="(currentTeam.id as string)" isReadonly />

    <button v-if="currentTeam" @click="router.push({ name: 'home' })" class="btn-primary">
      Retour à l'accueil
    </button>
  </main>
</template>

<style scoped lang="scss">
.btn-primary {
  align-self: center;
  width: 100%;
  margin-top: 2rem;
}
</style>
