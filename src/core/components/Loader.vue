<template>
  <div class="text-center" v-if="isLoading">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useLoaderStore } from '@/core/stores/LoaderStore';

const props = defineProps<{ loaderKey: string; }>();
const loaderStore = useLoaderStore();
const isLoading = computed(() => loaderStore.isLoading(props.loaderKey));
</script>
