import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { toTeam, type TeamInterface } from '@/types/team'
import { BDD_URL } from '@/constant'
import { toast } from 'vue-sonner'

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
        
        toast.success('Équipe créée', {
          description: new Date().toLocaleString(),
          action: {
            label: 'Fermer',
          },
        })

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
        
        toast.success('Équipe mise à jour', {
          description: new Date().toLocaleString(),
          action: {
            label: 'Fermer',
          },
        })

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
        
        setTimeout(() => 
          toast.success('Équipe supprimée', {
            description: new Date().toLocaleString(),
            action: {
              label: 'Fermer',
            },
          }), 250)
        
        teams.value = teams.value.filter(team => team.id !== teamId)
      })
      .catch(() => {
        // console.error('Erreur:', error)
        // throw error
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
