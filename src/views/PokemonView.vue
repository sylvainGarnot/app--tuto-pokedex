<script setup lang="ts">
import { useRoute } from 'vue-router'
import BaseButtonBack from '@/components/base/BaseButtonBack.vue'
import PokemonDetail from '../components/PokemonDetail.vue'
import { ref } from 'vue'

const route = useRoute()

const slotName = ref('title')

</script>

<template>
  <main>
    <BaseButtonBack />
    <PokemonDetail :id="(route.params.id as string)" istitle >
      <template #[slotName]>
        <h2 class="text-2xl font-bold mb-4">{{ $slots.title ? '' : 'Détails du Pokémon' }}</h2>
      </template>



      <template #footer>
        <div class="p-4 border-t">
          <button class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
            button test
          </button>
        </div>
      </template>

    </PokemonDetail>
  </main>
</template>

<style scoped>
</style>
