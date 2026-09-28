export interface PokemonTypeInterface {
  name: string
  icons?: {
    name_icon?: string
    symbol_icon?: string
  }
}

export function toPokemonType(raw: {
  name?: string,
  sprites?: {
    "generation-viii": {
      "sword-shield": {
        name_icon: string
        symbol_icon: string
      }
    }
  }
}): PokemonTypeInterface {
  return {
    name: raw.name ?? '',
    icons: {
      name_icon: raw.sprites?.["generation-viii"]?.["sword-shield"]?.name_icon ?? '',
      symbol_icon: raw.sprites?.["generation-viii"]?.["sword-shield"]?.symbol_icon ?? '',
    }
  } as PokemonTypeInterface
}
