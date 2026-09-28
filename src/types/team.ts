
import type { Pokemon } from '@/types/pokemon'

export interface TeamInterface {
  id: string
  name: string
  subname?: string
  pokemons: Pokemon[]
  createdAt: string
  updatedAt?: string
}