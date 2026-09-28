<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { onMounted } from 'vue'
import { useTeamStore } from '@/stores/teamStore'
import { useTypeStore } from '@/stores/typeStore'
import PokemonTeamMultiple from '@/components/feature/PokemonTeam/PokemonTeamMultiple.vue'

const teamStore = useTeamStore()
const typeStore = useTypeStore()

onMounted(async () => {
  teamStore.apiGetTeams()

  console.log('Mounted HomeView, fetching teams...')
  await typeStore.apiGetTypes()
})
</script>

<template>
  <main>
    <div class="content">
      <div class="left-section">
        <h1>Bienvenue</h1>
        <p>Explorez le monde des Pokémon</p>
        <div class="buttons">
          <RouterLink to="/search" class="btn">Recherche simple</RouterLink>
          <RouterLink to="/search-advanced" class="btn">Recherche avancée</RouterLink>
          <RouterLink to="/create-team" class="btn btn-secondary">Créer une équipe</RouterLink>
        </div>
      </div>
      <div class="right-section">
        <h2>Vos équipes</h2>
        <section class="teams-section">
          <PokemonTeamMultiple :teams="teamStore.teams" />
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
      flex: 2;
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