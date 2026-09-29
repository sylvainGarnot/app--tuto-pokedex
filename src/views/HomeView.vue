<script setup lang="ts">
import { onMounted } from 'vue'
import { useTeamStore } from '@/stores/teamStore'
import { usePokemonTypeStore } from '@/stores/pokemonTypeStore'
import PokemonTeamDetailMultiple from '@/components/feature/PokemonTeam/PokemonTeamDetailMultiple.vue'
import BaseRouterLink from '@/components/base/BaseRouterLink.vue'

const teamStore = useTeamStore()
const pokemonTypeStore = usePokemonTypeStore()

onMounted(async () => {
  teamStore.apiGetTeams()

  console.log('Mounted HomeView, fetching teams...')
  await pokemonTypeStore.apiGetTypes()
})
</script>

<template>
  <main>
    <div class="content">
      <div class="left-section">
        <h1>Bienvenue</h1>
        <p>Explorez le monde des Pokémon</p>
        <div class="buttons">
          <BaseRouterLink :to="{ name: 'search' }">Recherche simple</BaseRouterLink>
          <BaseRouterLink :to="{ name: 'search-advanced' }">Recherche avancée</BaseRouterLink>
          <BaseRouterLink :to="{ name: 'team-create-home' }">Créer une équipe</BaseRouterLink>
        </div>
      </div>
      <div class="right-section">
        <h2>Vos équipes</h2>
        <section class="teams-section">
          <PokemonTeamDetailMultiple :teams="teamStore.teams" />
        </section>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
main {
  .content {
    display: flex;
    gap: 2rem;

    .left-section {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;

      .buttons {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .btn {
        display: inline-block;
        padding: 0.75rem 2rem;
        background-color: #42b983;
        color: white;
        text-decoration: none;
        border-radius: 4px;
        transition: background-color 0.2s;
        white-space: nowrap;
      }

      .btn:hover {
        background-color: #369970;
      }

      .btn-secondary {
        background-color: #5a7eff;
      }

      .btn-secondary:hover {
        background-color: #4a6eef;
      }
    }
  }

  .right-section {
    flex: 1;

    .teams-section {
      margin-top: 0;
      padding-top: 0;
      border-top: none;
    }
  }
}
</style>