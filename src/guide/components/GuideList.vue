<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Email</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="guide in guides" :key="guide.id">
        <th scope="row">{{ guide.id }}</th>
        <td>{{ guide.description }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { Guide } from '@/guide/schemas/GuideSchema';

const props = defineProps<{ guides: Guide[] }>();
</script>
