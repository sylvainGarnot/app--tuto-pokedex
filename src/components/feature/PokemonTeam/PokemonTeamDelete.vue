<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTeamStore } from '@/stores/teamStore'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseAlertDialog from '@/components/base/BaseAlertDialog.vue'

const router = useRouter()
const teamStore = useTeamStore()
const currentTeam = computed(() => teamStore.currentTeam)


const showAlertDialog = ref(false)


function deleteTeam() {
  if (currentTeam.value) {
    teamStore.apiDeleteTeam(currentTeam.value.id).then(() => {
      router.push({ name: 'home' })
    })
  }
}

</script>

<template>
  <main>
    <BaseButton v-if="currentTeam" @click="showAlertDialog = true" variant="destructive">
      Supprimer l'équipe
    </BaseButton>

    <BaseAlertDialog v-if="showAlertDialog" v-model:open="showAlertDialog" @continue="deleteTeam">
      <template #title>
        Supprimer l'équipe
      </template>
      Êtes-vous sûr ? This action cannot be undone. This will permanently delete your team
      <template #cancel>
        Annuler
      </template>
      <template #continue>
        Supprimer
      </template>
    </BaseAlertDialog>
  </main>
</template>

<style scoped>

.btn-delete {
  padding: 0.75rem;
  background-color: #ff4444;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-delete:hover {
  background-color: #cc0000;
}
</style>
