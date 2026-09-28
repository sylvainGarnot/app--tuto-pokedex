<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { Pokemon } from '@/types/pokemon'

defineProps<{
  pokemons: Pokemon[]
}>()
</script>

<template>
  <div v-if="pokemons.length > 0" class="results-list">
    <h2>{{ pokemons.length }} Pokémon trouvé(s)</h2>
    <div class="pokemon-grid">
      <RouterLink v-for="pokemon in pokemons" :key="pokemon.id" :to="`/pokemon/${pokemon.id}`" class="pokemon-item">
        <span class="pokemon-id">{{ pokemon.id }}</span>
        <span class="pokemon-name">{{ pokemon.name }}</span>
        <img v-if="pokemon?.sprites?.front_default" :src="pokemon.sprites.front_default" :alt="pokemon.name" class="pokemon-sprite" />
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.results-list {
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.pokemon-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;
}

.pokemon-item {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #eee;
  transition: transform 0.2s ease;
  cursor: pointer;
  border: 1px solid #eee;
  transition: transform 0.2s ease;
}

.pokemon-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.pokemon-id {
  font-size: 0.9rem;
  font-weight: bold;
  color: #666;
}

.pokemon-name {
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  text-transform: capitalize;
}

.pokemon-sprite {
  max-width: 100px;
  height: auto;
  border-radius: 4px;
}

@media (max-width: 1024px) {
  .pokemon-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 768px) {
  .pokemon-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 480px) {
  .pokemon-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
