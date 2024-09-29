<template>
    <div class="d-flex">
      <img v-if="igdb_image" width="200" :src="`https://images.igdb.com/igdb/image/upload/t_screenshot_med/${igdb_image}.png`" class="rounded-start" />
      <img v-else width="200" :src="`https://placehold.co/400x200`" />
      <h3 class="ms-4 mt-3">{{ game.name }}</h3>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { Game, IgdbGame } from '@/game/schemas/GameSchema';
  const props = defineProps<{
    game: Game | IgdbGame;
    igdb_image: string;
  }>();
  </script>
  