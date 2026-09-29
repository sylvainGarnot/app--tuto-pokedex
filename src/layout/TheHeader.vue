<template>
  <header>
    <nav>
      <BaseRouterLink :to="{ name: 'home' }">Home</BaseRouterLink>
      <BaseRouterLink :to="{ name: 'search' }">Recherche</BaseRouterLink>
      <BaseRouterLink :to="{ name: 'search-advanced' }">Recherche Avancée</BaseRouterLink>
      <BaseRouterLink :to="{ name: 'team-create-home' }">Créer Équipe</BaseRouterLink>
    </nav>
  </header>
</template>

<script setup lang="ts">
import BaseRouterLink from '@/components/base/BaseRouterLink.vue';
</script>

<style scoped>
header {
  border-bottom: 1px solid #ccc;
  padding: 1rem;
}

nav {
  display: flex;
  gap: 2rem;
}

a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.2s;
}

a:hover {
  color: #666;
}

a.router-link-active {
  color: #42b983;
}
</style>
