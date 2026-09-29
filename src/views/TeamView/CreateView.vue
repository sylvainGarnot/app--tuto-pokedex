<script setup lang="ts">
import { RouterView } from 'vue-router'
import PokemonTeamCreateStepper from '@/components/feature/PokemonTeam/PokemonTeamCreateStepper.vue'
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const step = ref(0)
const route = useRoute()

watch(route, (newRoute) => {
  console.log('Current step:', newRoute.name)
  switch (newRoute.name) {
    case 'team-create-add-name':
      step.value = 0
      break
    case 'team-create-add-pokemons':
      step.value = 1
      break
    case 'team-create-resume':
      step.value = 2
      break
  }
})

</script>

<template>
  <main>
    <h1>Créer une équipe</h1>
    <PokemonTeamCreateStepper :step="step" />

    <RouterView />
  </main>
</template>

<style scoped></style>
