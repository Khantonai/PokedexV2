<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import type PokemonType from '../utils/pokemonDataType'

import ListCard from '../components/ListCard.vue'
import PokemonInfo from '../components/PokemonInfo.vue'
import FilterList from '../components/FilterList.vue'

const API_BASE_URL = 'https://tyradex.app/api/v1'
const ALL_POKEMON_URL = `${API_BASE_URL}/pokemon`
const GENERATION_URL = (gen: number) => `${API_BASE_URL}/gen/${gen}`

const route = useRoute()
const rawResults = ref<PokemonType[]>([])
const filteredResults = ref<PokemonType[]>([])
const isLoading = ref(false)
const hasMoreData = ref(true)
const gen = ref(1)
const fetchAllData = ref(false)

const selectedPokemon = computed(() =>
  rawResults.value.find((pkmn) => pkmn.pokedex_id.toString() === route.params.id),
)

function setFilteredResults(tempResults: PokemonType[], activeFilters: boolean) {
  if (activeFilters) {
    fetchAllData.value = true
    fetchPokemonData()
  }
  filteredResults.value = tempResults || rawResults.value
}

async function fetchPokemonData() {
  if (isLoading.value || !hasMoreData.value) return
  isLoading.value = true

  try {
    const url = fetchAllData.value ? ALL_POKEMON_URL : GENERATION_URL(gen.value)
    const response = await fetch(url)
    const data: PokemonType[] = await response.json()

    if (fetchAllData.value) {
      rawResults.value = data
      hasMoreData.value = false
    } else {
      if (data.length === 0) {
        hasMoreData.value = false
      } else {
        rawResults.value = [...rawResults.value, ...data]
        gen.value++
      }
    }
  } catch (error) {
    console.error('Error fetching Pokémon data:', error)
  } finally {
    isLoading.value = false
  }
}

function handleScroll(event: Event) {
  const target = event.target as HTMLElement
  if (target.scrollTop + target.clientHeight >= target.scrollHeight - 10) {
    fetchPokemonData()
  }
}

onMounted(() => {
  fetchPokemonData()
})
</script>

<template>
  <div id="pokedex">
    <header :tabindex="selectedPokemon ? '-1' : '0'">
      <section aria-label="filtre pokedex">
        <FilterList
          :pkmnData="rawResults"
          @filteredResults="setFilteredResults"
          :pkmnInfoModal="!!selectedPokemon"
        />
      </section>
    </header>

    <main
      :style="{ paddingRight: $route.params.id ? '365px' : '0' }"
      @scroll="handleScroll"
      :tabindex="selectedPokemon ? '-1' : '0'"
    >
      <ListCard
        v-for="pkmnData in filteredResults"
        :key="pkmnData.pokedex_id"
        :pkmnData="pkmnData"
        :tabindex="selectedPokemon ? '-1' : '0'"
      />
      <div v-if="isLoading" class="loading-indicator">Chargement...</div>
    </main>

    <PokemonInfo
      v-if="selectedPokemon"
      :pkmnData="selectedPokemon"
      aria-label="Fiche info pokemon"
    />
  </div>
</template>

<style scoped>
#pokedex {
  display: flex;
}

main {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  height: 100vh;
  overflow-y: scroll;
  align-items: flex-start;
}

.loading-indicator {
  width: 100%;
  text-align: center;
  padding: 10px;
  font-size: 16px;
  color: #666;
}
</style>
