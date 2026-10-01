<script setup lang="ts">
import { onUpdated, ref } from 'vue'

import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'
import BaseButton from '@/components/base/BaseButton.vue'


// PROPS
const props = defineProps<{
  name?: string
  subname?: string
  submitButtonText: string
  cancelButtonText: string
}>()


// EMITS
const emit = defineEmits<{
  submit: [
    name: string,
    subname: string
  ]
  cancel: []
}>()


// DATA
const nameInput = ref(props.name ?? '')
const subnameInput = ref(props.subname ?? '')


// ON UPDATED
onUpdated(() => {
  initInput()
})


// FUNCTION
function initInput() {
  nameInput.value = props.name ?? ''
  subnameInput.value = props.subname ?? ''
}

function handleCancel() {
  initInput()
}

</script>

<template>

  <Card>
    <CardContent>

      <FieldGroup>
        <Field>
          <FieldLabel for="pokemon-team-edit-name">
            Nom de l'équipe
          </FieldLabel>
          <InputGroup>
            <InputGroupInput 
              id="pokemon-team-edit-name"
              v-model="nameInput"
              type="text"
              :placeholder="nameInput"
              @keyup.enter="emit('submit', nameInput, subnameInput)"
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton>Rechercher par nom</InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </Field>
      </FieldGroup>

      <br>
      <FieldGroup>
        <Field>
          <FieldLabel for="pokemon-team-edit-subname">
            Sous-titre (optionnel)
          </FieldLabel>
          <InputGroup>
            <InputGroupInput 
              id="pokemon-team-edit-subname"
              v-model="subnameInput"
              type="text"
              :placeholder="subnameInput"
              @keyup.enter="emit('submit', nameInput, subnameInput)"
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton>Rechercher par identifiant</InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </Field>
      </FieldGroup>

    </CardContent>

    <CardFooter>
      <BaseButton @click="handleCancel()" variant="outline">
        {{ props.cancelButtonText }}
      </BaseButton>
      <BaseButton @click="emit('submit', nameInput, subnameInput)">
        {{ props.submitButtonText }}
      </BaseButton>
    </CardFooter>

  </Card>

</template>

<style scoped>
</style>
