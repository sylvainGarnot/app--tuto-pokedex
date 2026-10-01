import type { PokemonTypeInterface } from '@/types/pokemonType'

export interface PokemonInterface {
  id: number
  pokedexId: number
  name: string
  height: number
  weight: number
  sprites?: {
    front_default?: string,
    back_default?: string,
    front_shiny?: string,
    back_shiny?: string,
  }
  stats: {
    hp: number,
    attack: number,
    defense: number,
    specialAttack: number,
    specialDefense: number,
    speed: number,
  }
  types?: PokemonTypeInterface[]
}


// FUNCTION
export function createEmptyPokemon(): PokemonInterface {
  return {
    id: 0,
    pokedexId: 0,
    name: '',
    height: 0,
    weight: 0,
    sprites: {
      front_default: '',
      back_default: '',
      front_shiny: '',
      back_shiny: '',
    },
    stats: {
      hp: 0,
      attack: 0,
      defense: 0,
      specialAttack: 0,
      specialDefense: 0,
      speed: 0,
    },
    types: [],
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
  stats?: {
    base_stat?: number
  }[]
  types?: {
    slot?: number
    type?: {
      name?: string
      url?: string
    }
  }[]
}): PokemonInterface {
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
    stats: {
      hp: raw.stats?.[0]?.base_stat ?? 0,
      attack: raw.stats?.[1]?.base_stat ?? 0,
      defense: raw.stats?.[2]?.base_stat ?? 0,
      specialAttack: raw.stats?.[3]?.base_stat ?? 0,
      specialDefense: raw.stats?.[4]?.base_stat ?? 0,
      speed: raw.stats?.[5]?.base_stat ?? 0,
    },
    types: (raw.types ?? [])
      .filter((t) => t.type?.name)
      .map((t) => ({
        name: t.type!.name as string,
      })),
  } as PokemonInterface
}