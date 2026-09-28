import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import type { PokemonInterface } from '@/types/pokemon'
import { toTeam, type TeamInterface } from '@/types/team'
import { BDD_URL } from '@/constant'

export const useTeamStore = defineStore('team', () => {

  // STATE
  const currentTeam = ref<TeamInterface | null>(null)
  const teams = ref<TeamInterface[]>([])


  // FUNCTIONS
  function setCurrentTeam(team: TeamInterface) {
    currentTeam.value = team
  }

  function addCurrentTeamPokemon(pokemon: PokemonInterface) {
    if (currentTeam.value && currentTeam.value.pokemons.length < 6) {
      currentTeam.value.pokemons.push(pokemon)
    }
  }

  function removeCurrentTeamPokemon(pokemonId: number) {
    if (currentTeam.value) {
      currentTeam.value.pokemons = currentTeam.value.pokemons.filter(
        p => p.id !== pokemonId
      )
    }
  }

  function updateTeams(team: TeamInterface) {
    if (currentTeam.value && currentTeam.value.id === team.id) {
      currentTeam.value = { ...team }
    }
    const index = teams.value.findIndex(t => t.id === team.id)
    if (index !== -1) {
      teams.value[index] = { ...team }
    }
  }

  function clearCurrentTeam() {
    currentTeam.value = null
  }

  
  // API CALLS
  async function apiGetTeams() {
    return axios.get(BDD_URL + '/teams')
      .then(response => {
        teams.value = response.data
        return response.data
      })
      .catch(error => {
        console.error('Erreur:', error)
        throw error
      })
  }

  async function apiGetTeam(id: string) {
    axios.get(BDD_URL + '/teams/' + id)
      .then(response => {
        setCurrentTeam(toTeam(response.data))
      })
      .catch(error => {
        console.error('Erreur:', error)
      })
  }

  async function apiPostTeam(team: TeamInterface) {
    return axios.post(BDD_URL + '/teams', team)
      .then((response) => {
        console.log('Équipe créée avec succès:', response)
        clearCurrentTeam()
        setCurrentTeam(toTeam(response.data))
      })
      .catch(error => {
        console.error('Erreur:', error)
        throw error
      })
  }

  async function apiPutTeam(team: TeamInterface) {
    try {
      await fetch(BDD_URL + `/teams/${team.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(team),
      })
      updateTeams(team as TeamInterface)
    } catch {
      // error handling
    } finally {
      // loading false
    }
  }


  async function apiDeleteTeam(teamId: string) {
    return axios.delete(BDD_URL + `/teams/${teamId}`)
      .then(() => {
        teams.value = teams.value.filter(team => team.id !== teamId)
        if (currentTeam.value?.id === teamId) {
          clearCurrentTeam()
        }
      })
      .catch(error => {
        console.error('Erreur:', error)
        throw error
      })
  }

  return {
    currentTeam,
    teams,
    setCurrentTeam,
    addCurrentTeamPokemon,
    removeCurrentTeamPokemon,
    apiGetTeam,
    apiGetTeams,
    apiPostTeam,
    apiPutTeam,
    apiDeleteTeam,
    clearCurrentTeam,
  }
})
