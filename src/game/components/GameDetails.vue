<template>
    <div>
      <h3>{{ game.name }}</h3>
      <div class="d-flex">
        <span class="badge bg-primary me-1">{{ game.id }}</span>
        <span class="badge bg-secondary">{{ game.igdb_id }}</span>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { Game } from '@/game/schemas/GameSchema';
  const props = defineProps<{
    game: Game;
  }>();
  </script>
  