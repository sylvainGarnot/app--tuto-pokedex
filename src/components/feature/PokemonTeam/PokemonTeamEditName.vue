<script setup lang="ts">
import { ref, watch } from 'vue'

import { Card, CardContent } from '@/components/ui/card'
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field'
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
const nameInput = ref('')
const subnameInput = ref('')
const nameError = ref('')

// Synchronise les inputs uniquement lorsque les props changent.
watch(
  () => [props.name, props.subname],
  ([name, subname]) => {
    nameInput.value = name ?? ''
    subnameInput.value = subname ?? ''
    nameError.value = ''
  },
  {
    immediate: true,
  },
)

// FUNCTIONS
function validateName() {
  if (!nameInput.value.trim()) {
    nameError.value = 'Le nom de l’équipe est obligatoire.'
    return false
  }
  nameError.value = ''
  return true
}

function handleSubmit() {
  if (!validateName()) {
    return
  }

  emit('submit', nameInput.value.trim(), subnameInput.value.trim())
}

function handleCancel() {
  nameInput.value = props.name ?? ''
  subnameInput.value = props.subname ?? ''
  nameError.value = ''
  emit('cancel')
}
</script>

<template>
  <Card>
    <CardContent>
      <form @submit.prevent="handleSubmit">
        <FieldGroup>
          <FieldSet>
            <FieldGroup>

              <!-- Nom obligatoire -->
              <Field :data-invalid="nameError ? true : undefined" >
                <FieldLabel for="pokemon-team-edit-name">
                  Nom de l'équipe
                </FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="pokemon-team-edit-name"
                    v-model="nameInput"
                    type="text"
                    placeholder="Ex. Équipe Kanto"
                    @input="nameError = ''"
                  />

                  <InputGroupAddon align="inline-end">
                    <InputGroupButton type="button">
                      Nom de l'équipe
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                <FieldError v-if="nameError">
                  {{ nameError }}
                </FieldError>
              </Field>

              <!-- Sous-titre facultatif -->
              <Field>
                <FieldLabel for="pokemon-team-edit-subname">
                  Sous-titre (optionnel)
                </FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="pokemon-team-edit-subname"
                    v-model="subnameInput"
                    type="text"
                    placeholder="Ex. Équipe pour la Ligue"
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton type="button">
                      Sous-titre (optionnel)
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </Field>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>

        <div class="mt-6 flex gap-3">
          <BaseButton
            type="button"
            variant="outline"
            @click="handleCancel"
          >
            {{ cancelButtonText }}
          </BaseButton>

          <BaseButton type="submit">
            {{ submitButtonText }}
          </BaseButton>
        </div>
      </form>
    </CardContent>
  </Card>
</template>