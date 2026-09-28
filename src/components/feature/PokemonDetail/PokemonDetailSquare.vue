<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { Pokemon } from '@/types/pokemon'

defineProps<{
  pokemon: Pokemon
}>()
</script>

<template>
  <RouterLink :to="`/pokemon/${pokemon.id}`" class="pokemon-item">
    <span class="pokemon-id">{{ pokemon.id }}</span>
    <span class="pokemon-name">{{ pokemon.name }}</span>
    <img v-if="pokemon?.sprites?.front_default" :src="pokemon.sprites.front_default" :alt="pokemon.name" class="pokemon-sprite" />
  </RouterLink>
</template>

<style scoped>
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
</style>
