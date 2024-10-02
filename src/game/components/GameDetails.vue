<template>
  <div class="d-flex align-items-center">
    <Loader v-if="!imageLoaded" :loaderKey="imageLoaderKey" class="rounded-start p-4" :style="{ width: '200px', height: '112px' }" />
    <img
      v-if="igdb_image"
      width="200"
      :src="`https://images.igdb.com/igdb/image/upload/t_screenshot_med/${igdb_image}.png`"
      class="rounded-start"
      @load="onImageLoad"
      @error="onImageError"
      style="display: none;"
      ref="image"
    />
    
    <img
      v-else
      width="200"
      src="https://placehold.co/400x200"
      class="rounded-start"
      ref="placeholder"
      @load="onImageLoad"
    />
    
    <h3 class="ms-4 mt-3">{{ game.name }}</h3>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useLoaderStore } from '@/core/stores/LoaderStore';
import type { Game, IgdbGame } from '@/game/schemas/GameSchema';
import Loader from '@/core/components/Loader.vue';

const props = defineProps<{
  game: Game | IgdbGame;
  igdb_image: string;
}>();

const imageLoaded = ref(false);

const loaderStore = useLoaderStore();
const imageLoaderKey = `game-details-image-${props.game.id}`;

const image = ref<HTMLImageElement | null>(null);
const placeholder = ref<HTMLImageElement | null>(null);

const onImageLoad = () => {
  imageLoaded.value = true;
  loaderStore.setLoading(imageLoaderKey, false);
  
  if (image.value) {
    image.value.style.display = 'block';
  }
};

const onImageError = () => {
  imageLoaded.value = true;
  loaderStore.setLoading(imageLoaderKey, false);
  
  if (placeholder.value) {
    placeholder.value.style.display = 'block';
  }
};

onMounted(() => {
  loaderStore.setLoading(imageLoaderKey, true);
});
</script>
