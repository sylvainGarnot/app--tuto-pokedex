import { defineStore } from 'pinia'
import { ref } from 'vue'
import { toType, type PokemonType } from '@/types/pokemon'
import { POKEAPI_URL } from '@/constant'

export const useTypeStore = defineStore('type', () => {

  // STATE
  const types = ref<PokemonType[]>([])


  // API CALLS
  async function apiGetTypes() {
    types.value = await fetch(`${POKEAPI_URL}/type`)
      .then((response) => response.json())
      .then(async (data: { results?: { url?: string }[] }) => {
        const urls = (data.results ?? [])
          .map((type) => type.url)
          .filter((url): url is string => Boolean(url))

        return await Promise.all(urls.map((url) => fetch(url).then((response) => response.json())))
      })
      .then((typeDetails: Parameters<typeof toType>[0][]) =>
        typeDetails
          .filter((type) => type.name)
          .map((type) => toType(type)),
      )
      .catch((err) => {
        console.error('Erreur lors du chargement des types:', err)
        return []
      })

    return types.value
  }

  return {
    types,
    apiGetTypes,
  }
})
