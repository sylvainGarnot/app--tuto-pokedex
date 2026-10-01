<script setup lang="ts">
import { ref } from 'vue'

import BaseButton from '@/components/base/BaseButton.vue'
import BaseAlertDialog from '@/components/base/BaseAlertDialog.vue'

const showAlertDialog = ref(false)

</script>

<template>
  <main>
    <BaseButton @click="showAlertDialog = true" variant="destructive">
      Supprimer l'équipe
    </BaseButton>

    <BaseAlertDialog v-if="showAlertDialog" v-model:open="showAlertDialog" @continue="$emit('confirm')">
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
