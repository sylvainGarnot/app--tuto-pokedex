import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchView.vue'),
    },
    {
      path: '/search-advanced',
      name: 'search-advanced',
      component: () => import('../views/SearchAdvancedView.vue'),
    },
    {
      path: '/pokemon/:id',
      name: 'pokemon',
      component: () => import('../views/PokemonView.vue'),
    },
    {
      path: '/create-team',
      component: () => import('../views/CreateTeamView.vue'),
      children: [
        {
          path: '',
          name: 'create-team-home',
          component: () => import('../views/CreateTeamView/NameView.vue'),
        },
        {
          path: 'add-pokemon',
          name: 'create-team-add-pokemons',
          component: () => import('../views/CreateTeamView/PokemonsView.vue'),
        },
        {
          path: 'resume',
          name: 'create-team-resume',
          component: () => import('../views/CreateTeamView/ResumeView.vue'),
        },
      ],
    },
    {
      path: '/team',
      component: () => import('../views/TeamView.vue'),
      children: [
        {
          path: '',
          name: 'team-home',
          component: () => import('../views/TeamView/HomeView.vue'),
        },
        {
          path: ':id',
          component: () => import('../views/TeamView/_Id.vue'),
          children: [
            {
              path: '',
              name: 'team-detail-home',
              component: () => import('../views/TeamView/_Id/HomeView.vue'),
            },
            {
              path: 'update',
              name: 'team-update',
              component: () => import('../views/TeamView/_Id/UpdateView.vue'),
            },
          ]
        },
      ],
    },
  ],
})

export default router
