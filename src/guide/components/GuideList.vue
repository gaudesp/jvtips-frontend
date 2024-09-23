<template>
  <div>
    <div v-for="guide in guides" :key="guide.id">
      <h3>{{ guide.name }}</h3>
      <p>{{ guide.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GuideSchema } from '@/guide/schemas/GuideSchema';

const props = defineProps<{ guides: GuideSchema[] }>();
</script>
