<script setup lang="ts">
import { Stepper, StepperDescription, StepperIndicator, StepperItem, StepperSeparator, StepperTitle, StepperTrigger } from '@/components/ui/stepper'
import { BookUser, CreditCard, Truck } from '@lucide/vue'

defineProps<{
  step: number
}>()

const steps = [
  {
    step: 0,
    title: 'Nom',
    description: 'Choisissez un nom',
    icon: BookUser,
  },
  {
    step: 1,
    title: 'Pokémons',
    description: 'Ajoutez des pokémons',
    icon: Truck,
  },
  {
    step: 2,
    title: 'Résumé',
    description: 'Vérifiez votre équipe',
    icon: CreditCard,
  },
]


</script>

<template>
  <Stepper class="flex w-10/12 items-start gap-2" :modelValue="step">
    <StepperItem
      v-for="item in steps"
      :key="item.step"
      :step="item.step"
      class="relative flex w-full flex-col items-center justify-center"
    >
      <StepperTrigger>
        <StepperIndicator v-slot="{ step }" class="bg-muted">
          <template v-if="item.icon">
            <component :is="item.icon" class="w-4 h-4" />
          </template>
          <span v-else>{{ step }}</span>
        </StepperIndicator>
      </StepperTrigger>

      <StepperSeparator
        v-if="item.step !== steps[steps.length - 1]?.step"
        class="absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
      />
      
      <div class="flex flex-col items-center">
        <StepperTitle>
          {{ item.title }}
        </StepperTitle>
        <StepperDescription>
          {{ item.description }}
        </StepperDescription>
      </div>
    </StepperItem>
  </Stepper>
</template>

<style scoped>
</style>
