<script setup lang="ts">
import type { PokemonInterface } from '@/types/pokemon'
import BaseRouterLink from '@/components/base/BaseRouterLink.vue';

defineProps<{
  pokemon: PokemonInterface
  noId?: boolean
  noTitle?: boolean
  small?: boolean
}>()
</script>

<template>
  <BaseRouterLink :to="{ name: 'pokemon', params: { id: pokemon.id } }" class="pokemon-item" :class="{ 'container-small': small }">
    <span v-if="!noId" class="pokemon-id">{{ pokemon.id }}</span>
    <span v-if="!noTitle" class="pokemon-name">{{ pokemon.name }}</span>
    <img v-if="pokemon?.sprites?.front_default" :src="pokemon.sprites.front_default" :alt="pokemon.name" class="pokemon-sprite" />
  </BaseRouterLink>
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

.pokemon-sprite {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.pokemon-item.container-small {
  width: 25px;
}

.pokemon-item.container-small .pokemon-sprite {
  width: 250%;
  height: 250%;
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

</style>
