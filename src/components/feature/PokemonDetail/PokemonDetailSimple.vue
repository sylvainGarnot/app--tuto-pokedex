<script setup lang="ts">
import { onMounted } from 'vue'
import type { PokemonInterface } from '@/types/pokemon'
import { usePokemonTypeStore } from '@/stores/pokemonTypeStore'
import BaseRouterLink from '@/components/base/BaseRouterLink.vue';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

defineProps<{
  pokemon: PokemonInterface
}>()

const pokemonTypeStore = usePokemonTypeStore()

onMounted(() => {
  if (pokemonTypeStore.types.length === 0) {
    pokemonTypeStore.apiGetTypes()
  }
})

function getTypeIcon(name: string) {
  return pokemonTypeStore.types.find((type) => type.name === name)?.icons?.symbol_icon
}
</script>

<template>
  <div v-if="pokemon" class="result">
    <BaseRouterLink :to="{ name: 'pokemon', params: { id: pokemon.id } }" class="pokemon-card-link">
      <div class="pokemon-card">
        <span class="pokemon-id">{{ pokemon.id }}</span>
        <span class="pokemon-name">{{ pokemon.name }}</span>
                
        <div v-if="pokemon?.sprites?.front_default">
          <Avatar>
            <AvatarImage :src="pokemon.sprites.front_default || ''" :alt="pokemon.name" />
            <AvatarFallback>{{ pokemon.name }}</AvatarFallback>
          </Avatar>
        </div>
        
        <div v-if="pokemon.types && pokemon.types.length > 0">
          <Avatar v-for="type in pokemon.types" :key="type.name">
            <AvatarImage :src="getTypeIcon(type.name) || ''" :alt="type.name" />
            <AvatarFallback>{{ type.name }}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </BaseRouterLink>
  </div>
</template>

<style scoped>
.result {
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  margin-top: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.pokemon-card-link {
  text-decoration: none;
  color: inherit;
}

.pokemon-card {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.pokemon-card:hover {
  opacity: 0.8;
  align-items: center;
  justify-content: space-between;
}

@media (max-width: 768px) {
  .pokemon-card {
    flex-direction: column;
    gap: 1.5rem;
  }
}

.pokemon-id {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  min-width: 50px;
}

.pokemon-name {
  font-size: 1.2rem;
  font-weight: 500;
  color: #333;
  min-width: 100px;
}

.pokemon-sprite {
  max-width: 100px;
  height: auto;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.pokemon-sprite:hover {
  transform: scale(1.05);
}

.types-icons {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-left: auto;
}

.type-icon {
  width: 40px;
  height: 40px;
  object-fit: contain;
}
</style>
