<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue';

const route = useRoute()
const layout = computed(() => `${route?.meta?.layout || `Default`}Layout`)
</script>

<template>
  <component :is="layout">
    <router-view />
  </component>
</template>
