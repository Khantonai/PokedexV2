<script setup lang="ts">
import type PokemonType from '../utils/pokemonDataType'
const emits = defineEmits(['filteredResults'])
import { ref, watchEffect, watch } from 'vue'

const props = defineProps<{
  pkmnData: PokemonType[]
  pkmnInfoModal: boolean
}>()

// filter data
const types = [
  'Normal',
  'Plante',
  'Feu',
  'Eau',
  'Électrik',
  'Glace',
  'Combat',
  'Poison',
  'Sol',
  'Vol',
  'Psy',
  'Insecte',
  'Roche',
  'Spectre',
  'Dragon',
  'Ténèbres',
  'Acier',
  'Fée',
]

const generations = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

// filter variables
const searchBar = ref('')
const typeFilter1 = ref('')
const typeFilter2 = ref('')
const genFilter = ref('')

// variables for filter state
const activeFilters = ref(false)

// reset typeFilter2 if typeFilter1 is empty
watch(typeFilter1, (newValue) => {
  if (!newValue || newValue === 'Tous les types') {
    typeFilter2.value = ''
  }
})

// clear all filters
function clearFilters() {
  searchBar.value = ''
  typeFilter1.value = ''
  typeFilter2.value = ''
  genFilter.value = ''
  activeFilters.value = false
  emits('filteredResults', props.pkmnData, activeFilters.value) // Émettre les données non filtrées
}

// filter results based on search bar and filters
function filterResults() {
  let tempResults = props.pkmnData

  // Filter by search bar
  const searchFilterRegex = new RegExp(String.raw`^${searchBar.value}`, 'i')
  tempResults = tempResults.filter((pkmn) => pkmn.name.fr.match(searchFilterRegex))

  // Filter by generation
  if (genFilter.value) {
    tempResults = tempResults.filter((pkmn) => pkmn.generation.toString() === genFilter.value)
  }

  // Filter by type
  if (typeFilter1.value && typeFilter1.value !== 'Tous les types') {
    tempResults = tempResults.filter((pkmn) =>
      pkmn.types.some((type) => type.name === typeFilter1.value),
    )
  }

  if (typeFilter2.value && typeFilter2.value !== 'Tous les types') {
    tempResults = tempResults.filter((pkmn) =>
      pkmn.types.some((type) => type.name === typeFilter2.value),
    )
  }

  // Check if any filters are active
  if (searchBar.value.length || typeFilter1.value || typeFilter2.value || genFilter.value) {
    activeFilters.value = true
  } else {
    activeFilters.value = false
  }

  // Emit the filtered results and the state of active filters
  emits('filteredResults', tempResults, activeFilters.value)
}

watchEffect(filterResults)
</script>

<template>
  <input
    type="text"
    placeholder="Search"
    v-model="searchBar"
    aria-label="Barre de recherche"
    :tabindex="pkmnInfoModal ? '-1' : '0'"
  />
  <div>
    <label for="type-select-1">Type 1 :</label>
    <select id="type-select-1" v-model="typeFilter1" :tabindex="pkmnInfoModal ? '-1' : '0'">
      <option value="">Tous les types</option>
      <option v-for="type in types" :key="type" :value="type">{{ type }}</option>
    </select>
  </div>
  <div v-if="typeFilter1 && typeFilter1 !== 'Tous les types'">
    <label for="type-select-2">Type 2 :</label>
    <select id="type-select-2" v-model="typeFilter2" :tabindex="pkmnInfoModal ? '-1' : '0'">
      <option value="">Tous les types</option>
      <option v-for="type in types.filter((t) => t !== typeFilter1)" :key="type" :value="type">
        {{ type }}
      </option>
    </select>
  </div>
  <div>
    <label for="generation-select">Génération :</label>
    <select id="generation-select" v-model="genFilter" :tabindex="pkmnInfoModal ? '-1' : '0'">
      <option value="">Toutes</option>
      <option v-for="gen in generations" :key="gen" :value="gen">Génération {{ gen }}</option>
    </select>
  </div>
  <button @click="clearFilters" :tabindex="pkmnInfoModal ? '-1' : '0'">
    Réinitialiser les filtres
  </button>
</template>
