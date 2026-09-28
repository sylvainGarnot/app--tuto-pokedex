<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { toPokemon, createEmptyPokemon, type Pokemon } from '../types/pokemon'
import { useTeamStore } from '../stores/teamStore'
import { POKEAPI_URL } from '@/constant';
const teamStore = useTeamStore()


// PROPS
const props = defineProps<{
  id: string
}>()


// REF
const pokemon = ref<Pokemon | null>(createEmptyPokemon())
const loading = ref(true)
const error = ref('')


// MOUNTED
onMounted(async () => {
  pokemon.value = await apiGetPokemon()
})


// FUNCTION
async function apiGetPokemon(): Promise<Pokemon | null> {
  loading.value = true

  // recherche dans le store
  for (const team of teamStore.teams) {
    const foundInTeam = team.pokemons.find((p: Pokemon) => p.id.toString() === props.id)
    if (foundInTeam) {
      console.log('TEST - Pokemon trouvé dans le store:', foundInTeam.name)
      loading.value = false
      return foundInTeam as Pokemon
    }
  }

  // Si non trouvé dans le store, fetch depuis l'API
  return fetch(`${POKEAPI_URL}/pokemon/${props.id}`)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      console.log('TEST - Pokémon trouvé dans l api', data)
      return toPokemon(data)
    })
    .catch((err) => {
      error.value = 'Erreur lors du chargement du Pokémon'
      console.error('Erreur:', err)
      return null
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>

  <div v-if="$slots.title" class="product-title" >
    <slot name="title">
    </slot>
  </div>

  <div v-if="loading" class="loading">Chargement...</div>

  <div v-if="error" class="error">{{ error }}</div>

  <div v-if="pokemon" class="pokemon-detail">
    <div class="pokemon-header">
      <div class="pokemon-image-section">
        <img v-if="pokemon.sprites?.front_default" :src="pokemon.sprites.front_default" :alt="pokemon.name" class="pokemon-image" />
        <p v-else class="no-image">Pas d'image disponible</p>
      </div>

      <div class="pokemon-info">
        <p class="pokemon-id">Pokédex ID: {{ pokemon.pokedexId }}</p>

        <div v-if="pokemon.sprites?.front_default" class="sprite-section">
          <h2>Sprite</h2>
          <img :src="pokemon.sprites.front_default" :alt="pokemon.name" class="sprite" />
        </div>

        <div class="types-section">
          <h2>Types</h2>
          <div class="types-list">
            <div v-for="type in pokemon.types" :key="type.name" class="type-item">
              <img :src="type.image" :alt="type.name" class="type-image" />
              <span>{{ type.name }}</span>
            </div>
          </div>
        </div>

        <div class="product-footer">
          <slot name="footer"></slot>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.loading {
  text-align: center;
  padding: 2rem;
  font-size: 1.1rem;
  color: #666;
}

.error {
  background-color: #fee;
  color: #c33;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.pokemon-detail {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.pokemon-header {
  display: flex;
  gap: 2rem;
  padding: 2rem;
  align-items: flex-start;
}

.pokemon-image-section {
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 250px;
  min-height: 250px;
  background-color: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #eee;
}

.pokemon-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.no-image {
  color: #999;
  font-size: 0.9rem;
}

.pokemon-info {
  flex: 1;
}

.pokemon-info h1 {
  margin: 0 0 1rem 0;
  font-size: 2.5rem;
  color: #333;
  text-transform: capitalize;
}

.pokemon-id {
  font-size: 1rem;
  color: #666;
  margin-bottom: 1.5rem;
}

.sprite-section {
  margin-bottom: 2rem;
  text-align: center;
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #eee;
}

.sprite-section h2 {
  font-size: 1.1rem;
  color: #333;
  margin: 0 0 0.75rem 0;
}

.sprite {
  max-width: 120px;
  height: auto;
  image-rendering: pixelated;
}

.types-section {
  margin-top: 2rem;
}

.types-section h2 {
  font-size: 1.3rem;
  color: #333;
  margin: 0 0 1rem 0;
}

.types-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.type-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #eee;
  min-width: 100px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.type-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.type-image {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.type-item span {
  font-weight: 600;
  color: #333;
  text-transform: capitalize;
  font-size: 0.95rem;
  text-align: center;
}

@media (max-width: 768px) {
  .pokemon-header {
    flex-direction: column;
    gap: 1.5rem;
  }

  .pokemon-image-section {
    min-width: 200px;
    min-height: 200px;
  }

  .pokemon-info h1 {
    font-size: 1.8rem;
  }

  .types-list {
    gap: 0.75rem;
  }
}
</style>
