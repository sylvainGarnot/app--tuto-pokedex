<script setup lang="ts">
import type { PokemonTeam } from '@/types/pokemon'
import PokemonDetailSquare from '@/components/feature/PokemonDetail/PokemonDetailSquare.vue'

defineProps<{
  teams: PokemonTeam[]
}>()
</script>

<template>
  <div class="teams-container">
    <div v-if="teams.length === 0" class="empty-message">
      Aucune équipe créée
    </div>
    <div v-else class="teams-grid">
      <RouterLink
        v-for="team in teams"
        :key="team.id"
        :to="{ name: 'team-detail-home', params: { id: team.id } }"
        class="team-card"
      >
        <div class="team-header">
          <h3>{{ team.name }}</h3>
        </div>
        <div class="team-pokemons">
          <PokemonDetailSquare
            v-for="pokemon in team.pokemons"
            :key="pokemon.id"
            :pokemon="pokemon"
            no-id
            no-title
            small
          />
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.teams-container {
  width: 100%;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}

.empty-message {
  text-align: center;
  color: #999;
  font-size: 1.1rem;
  padding: 2rem;
}

.teams-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

.team-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 0.75rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s;
  text-decoration: none;
  color: inherit;
  display: block;
}

.team-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.team-header {
  margin-bottom: 0;
  padding-bottom: 0.75rem;
}

.team-header h3 {
  margin: 0;
  color: #333;
  font-size: 1.1rem;
  text-align: left;
}

.team-pokemons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding-top: 0;
}
</style>
