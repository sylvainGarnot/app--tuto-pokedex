<script setup lang="ts">
import type { PokemonInterface } from '@/types/pokemon'
import BaseRouterLink from '@/components/base/BaseRouterLink.vue';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'

defineProps<{
  pokemon: PokemonInterface
  noId?: boolean
  noTitle?: boolean
  small?: boolean
}>()
</script>

<template>

  <Card>
    <CardContent>

      <BaseRouterLink :to="{ name: 'pokemon', params: { id: pokemon.id } }" class="pokemon-item" variant="ghost" :class="{ 'container-small': small }">
        <span v-if="!noId" class="pokemon-id">{{ pokemon.id }}</span>
        <span v-if="!noTitle" class="pokemon-name">{{ pokemon.name }}</span>

        <Avatar v-if="pokemon?.sprites?.front_default">
          <AvatarImage :src="pokemon.sprites.front_default || ''" :alt="pokemon.name" />
          <AvatarFallback>{{ pokemon.name }}</AvatarFallback>
        </Avatar>

      </BaseRouterLink>

    </CardContent>
  </Card>
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
