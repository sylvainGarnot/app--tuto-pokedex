<template>
  <header>
    <nav>
      <BaseRouterLink variant="outline" :to="{ name: 'home' }">Home</BaseRouterLink>
      <BaseRouterLink variant="outline" :to="{ name: 'search' }">Recherche</BaseRouterLink>
      <BaseRouterLink variant="outline" :to="{ name: 'search-advanced' }">Recherche Avancée</BaseRouterLink>
      <BaseRouterLink variant="default" :to="{ name: 'team-create-home' }">Créer Équipe</BaseRouterLink>
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

</style>
