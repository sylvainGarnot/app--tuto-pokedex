<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import type { PokemonInterface } from '@/types/pokemon'
import { usePokemonTypeStore } from '@/stores/pokemonTypeStore'
import { getPokemon } from '@/composables/usePokemon'
import { POKEAPI_URL } from '@/constant'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'

// PROPS
const props = defineProps({
  type1: String,
  type2: String,
})


// EMITS
const emit = defineEmits<{
  'search': [PokemonInterface[]]
  'update:type1': [string]
  'update:type2': [string]
}>()


// DATA
const pokemonTypeStore = usePokemonTypeStore()
const loading = ref(false)
const error = ref('')


// ON MOUNTED
onMounted(() => {
  if (pokemonTypeStore.types.length === 0) {
    pokemonTypeStore.apiGetTypes()
  }
})


// FUNCTIONS

function fetchTypePokemonNames(typeName: string): Promise<string[]> {
  return fetch(`${POKEAPI_URL}/type/${typeName}`)
    .then((response) => response.json())
    .then((data: { pokemon?: { pokemon?: { name?: string } }[] }) =>
      (data.pokemon ?? [])
        .map((entry) => entry.pokemon?.name)
        .filter((name): name is string => Boolean(name)),
    )
}

async function searchByType() {
  if (!props.type1) {
    emit('search', [])
    return
  }

  loading.value = true
  error.value = ''

  try {
    let names = await fetchTypePokemonNames(props.type1)

    if (props.type2) {
      const names2 = await fetchTypePokemonNames(props.type2)
      names = names.filter((name) => names2.includes(name))
    }

    const pokemons = await Promise.all(names.map((name) => getPokemon(name)))
    emit('search', pokemons.filter((pokemon): pokemon is PokemonInterface => pokemon !== null))
  } catch (err) {
    error.value = 'Erreur lors de la recherche'
    console.error('Erreur:', err)
    emit('search', [])
  } finally {
    loading.value = false
  }
}


// WATCHERS
watch(() => props.type1, () => {
  searchByType()
})

watch(() => props.type2, () => {
  searchByType()
})

</script>

<template>


  <FieldGroup>
    <Field>
      <FieldLabel for="search-by-type-native-select">
        Sélectionnez un type
      </FieldLabel>
      <NativeSelect 
        id="search-by-type-native-select"
        :modelValue="props.type1"
        @change="emit('update:type1', $event.target.value)">
        <NativeSelectOption value="">
          Sélectionnez un type...
        </NativeSelectOption>
        <NativeSelectOption v-for="t in pokemonTypeStore.types" :key="t.name" :value="t.name">
          {{ t.name }}
        </NativeSelectOption>      
      </NativeSelect>
      <FieldDescription>
        <img v-if="props.type1" :src="pokemonTypeStore.types.find(t => t.name === props.type1)?.icons?.symbol_icon" :alt="props.type1" class="type-image" />
      </FieldDescription>
    </Field>
  </FieldGroup>

  <FieldGroup>
    <Field>
      <FieldLabel for="search-by-type-native-select-2">
        Sélectionnez un second type
      </FieldLabel>
      <NativeSelect 
        id="search-by-type-native-select-2"
        :modelValue="props.type2"
        @change="emit('update:type2', $event.target.value)">
        <NativeSelectOption value="">
          Sélectionnez un type...
        </NativeSelectOption>
        <NativeSelectOption v-for="t in pokemonTypeStore.types" :key="t.name" :value="t.name">
          {{ t.name }}
        </NativeSelectOption>      
      </NativeSelect>
      <FieldDescription>
        <img v-if="props.type2" :src="pokemonTypeStore.types.find(t => t.name === props.type2)?.icons?.symbol_icon" :alt="props.type2" class="type-image" />
      </FieldDescription>
    </Field>
  </FieldGroup>

  <div v-if="error" class="error">{{ error }}</div>
  <div v-if="loading" class="load">Chargement...</div>
</template>

<style scoped>
</style>
