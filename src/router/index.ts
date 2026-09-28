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
        {
          path: 'create',
          component: () => import('../views/TeamView/CreateView.vue'),
          children: [
            {
              path: '',
              name: 'team-create-home',
              redirect: { name: 'team-create-add-name' }
            },
            {
              path: 'add-name',
              name: 'team-create-add-name',
              component: () => import('../views/TeamView/Create/AddNameView.vue'),
            },
            {
              path: 'add-pokemons',
              name: 'team-create-add-pokemons',
              component: () => import('../views/TeamView/Create/AddPokemonsView.vue'),
            },
            {
              path: 'resume',
              name: 'team-create-resume',
              component: () => import('../views/TeamView/Create/ResumeView.vue'),
            },
          ]
        },
      ],
    },
  ],
})

export default router
