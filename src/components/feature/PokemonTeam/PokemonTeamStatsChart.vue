<script setup lang="ts">
import { computed } from 'vue'
import type { PokemonInterface } from '@/types/pokemon'
import PokemonStatsChart from '@/components/feature/PokemonDetail/PokemonStatsChart.vue'

// PROPS
const props = defineProps<{
  pokemons: PokemonInterface[]
}>()

const hpTotal = computed(() => {
  let total = 0
  for (let index = 0; index < props?.pokemons?.length; index++) {
    const pokemon = props.pokemons[index];
    total += pokemon?.stats?.hp || 0
  }
  return total
})

const attackTotal = computed(() => {
  let total = 0
  for (let index = 0; index < props?.pokemons?.length; index++) {
    const pokemon = props.pokemons[index];
    total += pokemon?.stats?.attack || 0
  }
  return total
})

const defenseTotal = computed(() => {
  let total = 0
  for (let index = 0; index < props?.pokemons?.length; index++) {
    const pokemon = props.pokemons[index];
    total += pokemon?.stats?.defense || 0
  }
  return total
})

const specialAttackTotal = computed(() => {
  let total = 0
  for (let index = 0; index < props?.pokemons?.length; index++) {
    const pokemon = props.pokemons[index];
    total += pokemon?.stats?.specialAttack || 0
  }
  return total
})

const specialDefenseTotal = computed(() => {
  let total = 0
  for (let index = 0; index < props?.pokemons?.length; index++) {
    const pokemon = props.pokemons[index];
    total += pokemon?.stats?.specialDefense || 0
  }
  return total
})

const speedTotal = computed(() => {
  let total = 0
  for (let index = 0; index < props?.pokemons?.length; index++) {
    const pokemon = props.pokemons[index];
    total += pokemon?.stats?.speed || 0
  }
  return total
})


</script>

<template>

  <PokemonStatsChart
    :hp="hpTotal"
    :attack="attackTotal"
    :defense="defenseTotal"
    :special-attack="specialAttackTotal"
    :special-defense="specialDefenseTotal"
    :speed="speedTotal" />

</template>

<style scoped>
</style>
