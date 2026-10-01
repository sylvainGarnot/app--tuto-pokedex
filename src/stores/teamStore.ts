import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
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

  
  // API CALLS
  async function apiGetTeams() {
    return axios.get(BDD_URL + '/teams')
      .then(response => {
        teams.value = []
        for (let index = 0; index < response.data.length; index++) {
          teams.value.push(toTeam(response.data[index]))
        }
      })
      .catch(() => {
        // console.error('Erreur:', error)
        // throw error
      })
  }

  async function apiPostTeam(team: TeamInterface) {
    return axios.post(BDD_URL + '/teams', {
        ...team,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .then((response) => {
        teams.value.push(toTeam(response.data))
      })
      .catch(() => {
        // console.error('Erreur:', error)
        // throw error
      })
  }

  async function apiPutTeam(team: TeamInterface) {
    return axios.put(BDD_URL + `/teams/${team.id}`, {
        ...team,
        updatedAt: new Date().toISOString(),
      })
      .then((response) => {
        const index = teams.value.findIndex(t => t.id === team.id)
        if (index !== -1) {
          teams.value[index] = toTeam(response.data)
        }
      })
      .catch(() => {
        // console.error('Erreur:', error)
        // throw error
      })
  }


  async function apiDeleteTeam(teamId: string) {
    return axios.delete(BDD_URL + `/teams/${teamId}`)
      .then(() => {
        teams.value = teams.value.filter(team => team.id !== teamId)
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
    apiGetTeams,
    apiPostTeam,
    apiPutTeam,
    apiDeleteTeam,
  }
})
