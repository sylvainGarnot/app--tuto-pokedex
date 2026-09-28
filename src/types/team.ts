
import type { PokemonInterface } from '@/types/pokemon'

export interface TeamInterface {
  id: string
  name: string
  subname?: string
  pokemons: PokemonInterface[]
  createdAt: string
  updatedAt?: string
}


// FUNCTION
export function createEmptyTeam(): TeamInterface {
  return {
    id: '',
    name: '',
    subname: '',
    pokemons: [],
    createdAt: '',
    updatedAt: '',
  }
}

export function toTeam(raw: {
  id?: string
  name?: string
  subname?: string
  pokemons?: PokemonInterface[]
  createdAt?: string
  updatedAt?: string
}): TeamInterface {
  return {
    id: raw.id ?? '',
    name: raw.name ?? '',
    subname: raw.subname ?? '',
    pokemons: raw.pokemons ?? [],
    createdAt: raw.createdAt ?? '',
    updatedAt: raw.updatedAt ?? '',
  }
}