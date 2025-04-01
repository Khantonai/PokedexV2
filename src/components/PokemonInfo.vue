<script setup lang="ts">
import type PokemonType from '../utils/pokemonDataType'

const props = defineProps<{
  pkmnData: PokemonType
}>()

import { ref, watch, onMounted } from 'vue'

const modalRef = ref<HTMLElement | null>(null)

function focusModal() {
  if (modalRef.value) {
    modalRef.value.focus()
  }
}

onMounted(() => {
  focusModal()
})

watch(() => props.pkmnData, focusModal, { immediate: true })

// import InfoCont from './InfoCont.vue'
</script>

<template>
  <modal
    class="pokemon-info-container"
    id="modal"
    aria-label="Pokemon Info"
    ref="modalRef"
    tabindex="0"
  >
    <RouterLink to="/">X</RouterLink>
    <section class="pokemon-info-content">
      <img
        :src="
          pkmnData.generation <= 5
            ? `https://projectpokemon.org/images/sprites-models/bw-animated/${pkmnData.pokedex_id
                .toString()
                .padStart(3, '0')}.gif`
            : pkmnData.sprites.regular
        "
        :alt="`Sprite of ${pkmnData.name.fr}`"
        :class="pkmnData.generation <= 5 ? 'sprite' : 'sprite-3d'"
      />
      <p style="margin-top: 50px">Nº{{ props.pkmnData.pokedex_id }}</p>
      <p>{{ props.pkmnData.name.fr }}</p>
      <p>{{ props.pkmnData.category }}</p>
      <div class="types-container">
        <div v-for="t in props.pkmnData.types" :key="t.name" class="type-container">
          <img :src="t.image" alt="t.name" class="type-icon" />
          <p>{{ t.name }}</p>
        </div>
      </div>
      <div>
        <p>Talents</p>
        <div></div>
      </div>
      <div>
        <!-- <InfoCont title="Hauteur" :children="[props.pkmnData.resistances]" /> -->
        <!-- <InfoCont title="Hauteur" :children="[].fill(props.pkmnData.resistances.filter((weakness) => {
            weakness.multiplier > 1
        }))" /> -->
        <!-- <p>Weight: {{ props.pkmnData.weight }}kg</p> -->
      </div>
    </section>
  </modal>
</template>

<style scoped>
.pokemon-info-container {
  width: 365px;
  right: 0;
  height: 100vh;
  overflow-y: scroll;
  transition: 0.5s;
  /* background-color: var(--card-bg); */
  position: fixed;
  margin-inline: 10px;
  top: 0;
}

.pokemon-info-content {
  background-color: var(--card-bg);
  border-radius: 8px;
  margin-top: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 10px 10px 10px;
  margin-bottom: 10px;
  margin-right: 10px;
  gap: 10px;
}
</style>
