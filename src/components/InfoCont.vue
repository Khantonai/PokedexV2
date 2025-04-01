<script setup lang="ts">
const props = defineProps<{
  title: string
  children: []
  style: string
}>()

console.log(props.children)
</script>

<template>
  <div>
    <p>{{ title }}</p>
    <div v-for="child in props.children" :key="child">
      <p>{{ child }}</p>
      <!-- <div v-if="typeof child === 'object'">
        <img v-for="img in child" :src="img.image" alt="" v-bind:key="img.name" />
      </div> -->
    </div>
  </div>
</template>
