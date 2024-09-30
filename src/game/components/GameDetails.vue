<template>
  <div class="d-flex align-items-center">
    <!-- Loader while the image is loading, using the loaderKey -->
    <Loader v-if="!imageLoaded" :loaderKey="imageLoaderKey" class="rounded-start p-4" :style="{ width: '200px', height: '112px' }" />

    <!-- Image that will be shown once it's fully loaded -->
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
    
    <!-- Placeholder if no image is available -->
    <img
      v-else
      width="200"
      src="https://placehold.co/400x200"
      class="rounded-start"
      ref="placeholder"
      @load="onImageLoad"
    />
    
    <!-- Game title -->
    <h3 class="ms-4 mt-3">{{ game.name }}</h3>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useLoaderStore } from '@/core/stores/LoaderStore';
import type { Game, IgdbGame } from '@/game/schemas/GameSchema';
import Loader from '@/core/components/Loader.vue';

// Props passed to the component
const props = defineProps<{
  game: Game | IgdbGame;
  igdb_image: string;
}>();

// State to track if the image has finished loading
const imageLoaded = ref(false);

// Loader store for managing the loader
const loaderStore = useLoaderStore();
const imageLoaderKey = `game-details-image-${props.game.id}`;

// References to the image and placeholder elements
const image = ref<HTMLImageElement | null>(null);
const placeholder = ref<HTMLImageElement | null>(null);

// Called when the image finishes loading
const onImageLoad = () => {
  imageLoaded.value = true;
  loaderStore.setLoading(imageLoaderKey, false);  // Stop the loader when the image is loaded
  
  // Display the image after it has fully loaded
  if (image.value) {
    image.value.style.display = 'block';
  }
};

// Handle any errors (optional: show placeholder or mark as loaded to hide loader)
const onImageError = () => {
  imageLoaded.value = true;  // Mark as loaded even if there's an error
  loaderStore.setLoading(imageLoaderKey, false);  // Stop the loader in case of error
  
  // Optionally, we can ensure the placeholder remains visible
  if (placeholder.value) {
    placeholder.value.style.display = 'block';
  }
};

onMounted(() => {
  // Start the loader when the component is mounted
  loaderStore.setLoading(imageLoaderKey, true);
});
</script>
