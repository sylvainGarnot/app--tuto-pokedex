<script setup lang="ts">
import type { PokemonInterface } from '@/types/pokemon'

import PokemonDetailSimple from '@/components/feature/PokemonDetail/PokemonDetailSimple.vue'
import BaseButton from '@/components/base/BaseButton.vue'

// PROPS
defineProps<{
  pokemons?: PokemonInterface[],
  editable?: boolean
}>()


// EMITS
const emit = defineEmits<{
  removePokemon: [PokemonInterface]
}>()
</script>

<template>

    <div class="team-section" v-if="pokemons">
      <h2>Mon équipe ({{ pokemons.length }}/ 6)</h2>

      <div class="pokemons-container">
        <div v-if="pokemons.length === 0" class="empty-message">
          Aucun Pokémon dans l'équipe
        </div>

        <div v-for="pokemon in pokemons" :key="pokemon.id" class="pokemon-wrapper">

          <PokemonDetailSimple :pokemon="pokemon" />

          <!-- editable -->
          <BaseButton v-if="editable" @click="emit('removePokemon', pokemon)" variant="destructive">
            ✕ Retirer
          </BaseButton>
          <br>
        </div>
      </div>
    </div>

</template>

<style scoped>
.team-section {
  background-color: white;
  border-radius: 8px;
  min-width: 0;
  padding: 1.5rem;
  border-radius: 8px;
}

.pokemons-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.empty-message {
  text-align: center;
  color: #999;
  padding: 2rem 1rem;
  font-size: 0.95rem;
}

.pokemon-wrapper {
  position: relative;
  display: flex;
  gap: 1rem;
  align-items: center;
}
</style>
