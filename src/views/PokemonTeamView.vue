<script setup lang="ts">
import { useRoute } from 'vue-router'
import PokemonTeamDetail from '../components/PokemonTeamDetail.vue'
import BaseButtonBack from '@/components/base/BaseButtonBack.vue'

const route = useRoute()

</script>

<template>
  <main>
    <BaseButtonBack />
    <PokemonTeamDetail
      v-if="route.params.id" 
      :id="(route.params.id as string)"
    />
  </main>
</template>

<style scoped>
</style>
