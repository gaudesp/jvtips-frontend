<template>
  <div class="mt-4 container">
    <div class="card card-body mb-4">
      <Loader v-if="loaderStore.isLoading('gameLoader')" loaderKey="gameLoader" />
      <template v-if="game">
        <div v-if="!loaderStore.isLoading('gameLoader')">
          <GameDetails :game="game" />
        </div>
      </template>
      <template v-else>
        Il n'y a pas de guide pour ce jeu.
      </template>
    </div>
    <div class="card card-body" v-if="game">
      <Loader v-if="loaderStore.isLoading('guidesLoader')" loaderKey="guidesLoader" />
      <template v-if="guides && guides.length">
        <div v-if="!loaderStore.isLoading('guidesLoader')">
          <GuideList :guides="guides" />
        </div>
      </template>
    </div>
    <Pagination :pagination-key="`game-guides-${route.params.id}`" v-if="guides && guides.length && !loaderStore.isLoading('guidesLoader')" />
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useGameStore } from '@/game/stores/GameStore';
import GameDetails from '@/game/components/GameDetails.vue';
import GuideList from '@/guide/components/GuideList.vue';
import Loader from '@/core/components/Loader.vue';
import Pagination from '@/core/components/Pagination.vue';
import { loadWithLoader } from '@/core/helpers/LoadingHelper';
import { useLoaderStore } from '@/core/stores/LoaderStore';
import { usePaginationStore } from '@/core/stores/PaginationStore';

const route = useRoute();

const gameStore = useGameStore();
const loaderStore = useLoaderStore();
const paginationStore = usePaginationStore();

const game = computed(() => gameStore.game);
const guides = computed(() => gameStore.guides);
const currentPage = computed(() => paginationStore.getPagination(`game-guides-${route.params.id}`).currentPage);
const pageSize = computed(() => paginationStore.getPagination(`game-guides-${route.params.id}`).pageSize);

const loadGameGuides = async () => {
  await loadWithLoader(() => gameStore.loadGameGuides(route.params.id, { page: currentPage.value, size: pageSize.value }), 'guidesLoader');
};

const loadGameData = async () => {
  await loadWithLoader(() => gameStore.loadGameByIgdbId(route.params.id), 'gameLoader');
  await loadGameGuides();
};

onMounted(async () => {
  await loadGameData();
});

onBeforeUnmount(() => {
  gameStore.clearGameData();
});

watch(() => route.params.id, async () => {
  gameStore.clearGameData();
  await loadGameData();
});

watch(currentPage, async () => {
  await loadGameGuides();
});
</script>
