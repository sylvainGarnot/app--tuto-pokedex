<script setup lang="ts">
import PokemonTeamEditPokemons from '@/components/feature/PokemonTeam/PokemonTeamEditPokemons.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <main>
    <PokemonTeamEditPokemons />

    <div class="next-step">
      <button @click="router.push({ name: 'team-create-resume' })" class="btn-primary">
        Étape suivante
      </button>
    </div>
  </main>
</template>

<style scoped lang="scss">
.next-step {
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
}
</style>
