<script setup lang="ts">
import { ref } from 'vue'
import type { Pokemon } from '../types/pokemon'
import PokemonSearchSimpleSearch from '../components/PokemonSearchSimpleSearch.vue'
import PokemonSearchSimpleResult from '../components/PokemonSearchSimpleResult.vue'


// PROPS
const props = defineProps({
  id: String,
  name: String,
})


// EMITS
const emit = defineEmits<{
  'update:name': [string]
  'update:result': [Pokemon | null]
}>()


// DATA
const result = ref<Pokemon | null>(null)


// FUNCTIONS
function handleSearch(newResult: Pokemon | null) {
  result.value = newResult
  if (result.value) {
    emit('update:name', result.value.name)
    emit('update:result', result.value)
  } else {
    emit('update:name', '')
    emit('update:result', null)
  }
}

</script>

<template>
  <main>
    <PokemonSearchSimpleSearch
      :id="props.id"
      :name="props.name"
      @search="(event) => { handleSearch(event) }" />
    <PokemonSearchSimpleResult
      v-if="result && result.id"
      :pokemon="result" />
  </main>
</template>

<style scoped>
</style>