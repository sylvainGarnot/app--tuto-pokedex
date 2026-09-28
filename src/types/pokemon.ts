import type { PokemonType } from '@/types/pokemonType'
export interface Pokemon {
  id: number
  pokedexId: number
  name: string
  height: number
  weight: number
  sprites?: PokemonSprites
  types?: PokemonType[]
}

export interface PokemonSprites {
  front_default?: string,
  back_default?: string,
  front_shiny?: string,
  back_shiny?: string,
}

export interface PokemonTeam {
  id: string
  name: string
  subname?: string
  pokemons: Pokemon[]
  createdAt: string
  updatedAt?: string
}

export function createEmptyPokemon(): Pokemon {
  return {
    id: 0,
    pokedexId: 0,
    name: '',
    height: 0,
    weight: 0,
  }
}

// keep only the fields declared on Pokemon, discarding the rest of the PokeAPI response
export function toPokemon(raw: {
  id?: number
  name?: string
  height?: number
  weight?: number
  sprites?: {
    front_default?: string,
    back_default?: string,
    front_shiny?: string,
    back_shiny?: string,
  }
  types?: {
    slot?: number
    type?: {
      name?: string
      url?: string
    }
  }[]
}): Pokemon {
  return {
    id: raw.id ?? 0,
    pokedexId: raw.id ?? 0,
    name: raw.name ?? '',
    height: raw.height ?? 0,
    weight: raw.weight ?? 0,
    sprites: {
      front_default: raw.sprites?.front_default ?? null,
      back_default: raw.sprites?.back_default ?? null,
      front_shiny: raw.sprites?.front_shiny ?? null,
      back_shiny: raw.sprites?.back_shiny ?? null,
    },
    types: (raw.types ?? [])
      .filter((t) => t.type?.name)
      .map((t) => ({
        name: t.type!.name as string,
      })),
  } as Pokemon
}