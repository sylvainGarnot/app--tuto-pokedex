<script setup lang="ts">
import { computed } from 'vue'
import { Donut } from '@unovis/ts'
import { VisDonut, VisSingleContainer } from '@unovis/vue'
import { ChartContainer, ChartTooltip, ChartTooltipContent, componentToString, type ChartConfig } from '@/components/ui/chart'


// PROPS
const props = defineProps<{
  hp: number
  attack: number
  defense: number
  specialAttack: number
  specialDefense: number
  speed: number
}>()


// VARIABLES
const statLabels = [
  'PV',
  'Attaque',
  'Défense',
  'Attaque Spéciale',
  'Défense Spéciale',
  'Vitesse',
] as const

type StatKey =
  | 'hp'
  | 'attack'
  | 'defense'
  | 'specialAttack'
  | 'specialDefense'
  | 'speed'

interface StatData {
  stat: StatKey
  label: string
  value: number
  fill: string
}

const chartConfig = {
  value: {
    label: 'Valeur',
    color: undefined,
  },

  hp: {
    label: 'PV',
    color: '#F0B13B',
  },

  attack: {
    label: 'Attaque',
    color: '#E7180B',
  },

  specialAttack: {
    label: 'Attaque Spéciale',
    color: '#E61876',
  },

  defense: {
    label: 'Défense',
    color: '#2B7FFF',
  },

  specialDefense: {
    label: 'Défense Spéciale',
    color: '#3BB8DB',
  },

  speed: {
    label: 'Vitesse',
    color: '#37BC7D',
  },
} satisfies ChartConfig

const chartData = computed<StatData[]>(() => [
  {
    stat: 'hp',
    label: 'PV',
    value: props.hp,
    fill: '#F0B13B',
  },
  {
    stat: 'attack',
    label: 'Attaque',
    value: props.attack,
    fill: '#E7180B',
  },
  {
    stat: 'specialAttack',
    label: 'Attaque Spéciale',
    value: props.specialAttack,
    fill: '#E61876',
  },
  {
    stat: 'defense',
    label: 'Défense',
    value: props.defense,
    fill: '#2B7FFF',
  },
  {
    stat: 'specialDefense',
    label: 'Défense Spéciale',
    value: props.specialDefense,
    fill: '#3BB8DB',
  },
  {
    stat: 'speed',
    label: 'Vitesse',
    value: props.speed,
    fill: '#37BC7D',
  },
])

const totalStats = computed(() =>
  chartData.value.reduce(
    (total, stat) => total + stat.value,
    0,
  ),
)

function formatTooltipLabel(index: string | number) {
  const statIndex = Number(index)

  return statLabels[statIndex] ?? 'Statistique'
}
</script>

<template>
  <ChartContainer
    :config="chartConfig"
    class="mx-auto aspect-square max-h-70"
    :style="{
      '--vis-donut-central-label-font-size': 'var(--text-3xl)',
      '--vis-donut-central-label-font-weight': 'var(--font-weight-bold)',
      '--vis-donut-central-label-text-color': 'var(--foreground)',
      '--vis-donut-central-sub-label-text-color': 'var(--muted-foreground)',
    }"
  >
    <VisSingleContainer
      :data="chartData"
      :margin="{ top: 30, bottom: 30 }"
    >
      <VisDonut
        :value="(stat: StatData) => stat.value"
        :color="(stat: StatData) => chartConfig[stat.stat].color"
        :arc-width="35"
        :central-label-offset-y="10"
        :central-label="totalStats.toLocaleString()"
        central-sub-label="Total des stats"
      />

      <ChartTooltip
        :triggers="{
          [Donut.selectors.segment]: componentToString(
            chartConfig,
            ChartTooltipContent,
            {
              hideLabel: false,
              labelFormatter: formatTooltipLabel,
            },
          )!,
        }"
      />
    </VisSingleContainer>
  </ChartContainer>
</template>