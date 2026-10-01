<script setup lang="ts">
import { onUpdated, ref } from 'vue'

import { Card, CardContent } from '@/components/ui/card'
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

function handleSubmit() {
  emit('submit', nameInput.value, subnameInput.value)
}

function handleCancel() {
  initInput()
  emit('cancel')
}

</script>

<template>

  <Card>
    <CardContent>

      <form @submit.prevent="handleSubmit()">
        <FieldGroup>
          <FieldSet>
            <FieldGroup>
              <Field data-invalid>
                <FieldLabel for="pokemon-team-edit-name">
                  Nom de l'équipe
                </FieldLabel>
                <InputGroup>
                  <InputGroupInput 
                    id="pokemon-team-edit-name"
                    v-model="nameInput"
                    type="text"
                    :placeholder="nameInput"
                    @keyup.enter="handleSubmit()"
                    required
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton>Rechercher par nom</InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </Field>
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
                    @keyup.enter="handleSubmit()"
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton>Rechercher par identifiant</InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </Field>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>

        <br>
        <BaseButton @click="handleCancel()" variant="outline">
          {{ props.cancelButtonText }}
        </BaseButton>
        <BaseButton @click="handleSubmit()">
          {{ props.submitButtonText }}
        </BaseButton>
      </form>

    </CardContent>
  </Card>

</template>

<style scoped>
</style>
