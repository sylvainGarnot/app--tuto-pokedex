<script setup lang="ts">
import PokemonTeamUpdateAddPokemon from '@/components/feature/PokemonTeam/PokemonTeamUpdateAddPokemon.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <main>
    <PokemonTeamUpdateAddPokemon />

    <button @click="router.push({ name: 'createTeamResume' })" class="btn-primary">
      Étape suivante
    </button>
  </main>
</template>

<style scoped lang="scss">

</style>
