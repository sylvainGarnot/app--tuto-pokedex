
import type { PokemonInterface } from '@/types/pokemon'

export interface TeamInterface {
  id: string
  name: string
  subname?: string
  pokemons: PokemonInterface[]
  createdAt: string
  updatedAt?: string
}