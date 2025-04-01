<script setup lang="ts">
import type PokemonType from '../utils/pokemonDataType'

defineProps<{
  pkmnData: PokemonType
}>()
</script>

<template>
  <button class="list-card" @click="$router.push(`/${pkmnData.pokedex_id}`)">
    <img
      :src="
        pkmnData.generation <= 5
          ? `https://projectpokemon.org/images/sprites-models/bw-animated/${pkmnData.pokedex_id
              .toString()
              .padStart(3, '0')}.gif`
          : pkmnData.sprites.regular
      "
      alt=""
      :class="pkmnData.generation <= 5 ? 'sprite' : 'sprite-3d'"
    />
    <div class="pokemon-card-info">
      <p>Nº{{ pkmnData.pokedex_id.toString().padStart(3, '0') }}</p>
      <p>{{ pkmnData.name.fr }}</p>
      <div class="types-container">
        <div v-for="t in pkmnData.types" :key="t.name" class="type-container" aria-label="">
          <img :src="t.image" alt="" class="type-icon" />
          <p aria-label="">{{ t.name }}</p>
        </div>
      </div>
    </div>
  </button>
</template>

<style scoped>
.list-card {
  width: 250px;
  height: fit-content;
  background-color: var(--card-bg);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 50px;
  cursor: pointer;
  position: relative;
  border: none;
  /* min-height: 202px; */
}

.pokemon-card-info {
  margin-top: 50px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 10px;
  z-index: 2;
  position: relative;
}

.types-container {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
}

.type-container {
  display: flex;
  align-items: center;
  gap: 5px;
}
</style>
