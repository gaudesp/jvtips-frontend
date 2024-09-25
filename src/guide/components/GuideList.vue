<template>
  <div>
    <div v-for="guide in guides" :key="guide.id">
      <h3>{{ guide.title }}</h3>
      <p>{{ guide.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Guide } from '@/guide/schemas/GuideSchema';

const props = defineProps<{ guides: Guide[] }>();
</script>
