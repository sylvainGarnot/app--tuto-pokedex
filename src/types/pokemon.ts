export interface Pokemon {
  id: number
  pokedexId: number
  name: string
  height: number
  weight: number
  sprite: string
  types: PokemonType[]
}

export interface PokemonType {
  name: string
  image?: string
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
    sprite: '',
    types: [],
  }
}

// keep only the fields declared on Pokemon, discarding the rest of the PokeAPI response
export function toPokemon(raw: {
  id: number
  name: string
  height: number
  weight: number
  sprites: {
    front_default: string | null
  }
  types: {
    slot: number
    type: {
      name: string
      url: string
    }
  }[]
}): Pokemon {
  return {
    id: raw.id,
    pokedexId: raw.id,
    name: raw.name,
    height: raw.height,
    weight: raw.weight,
    sprite: raw.sprites.front_default ?? '',
    types: raw.types.map((t) => ({
      name: t.type.name,
    })),
  }
}
