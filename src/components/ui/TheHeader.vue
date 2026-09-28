<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/search">Recherche</RouterLink>
      <RouterLink to="/search-advanced">Recherche Avancée</RouterLink>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
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
