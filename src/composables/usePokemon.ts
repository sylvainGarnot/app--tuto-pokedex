import { toPokemon, type PokemonInterface } from '@/types/pokemon'
import { POKEAPI_URL } from '@/constant'

export async function getPokemon(identifier: string): Promise<PokemonInterface | null> {
  return fetch(`${POKEAPI_URL}/pokemon/${identifier.toLowerCase()}/`)
    .then((response) => response.json())
    .then((data) => toPokemon(data))
    .catch((err) => {
      console.error('Erreur lors du chargement du Pokémon:', err)
      return null
    })
}
