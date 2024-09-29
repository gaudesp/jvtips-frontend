<template>
  <div class="mt-4 container">
    <Loader v-if="loaderStore.isLoading('gameLoader')" loaderKey="gameLoader" />
    <template v-if="game">
      <div class="card card-body mb-4 p-0">
        <div v-if="!loaderStore.isLoading('gameLoader')">
          <GameDetails :game="game" :igdb_image="game.igdb_image" />
        </div>
      </div>
      <div class="card card-body" v-if="game">
        <Loader v-if="loaderStore.isLoading('guidesLoader')" loaderKey="guidesLoader" />
        <template v-if="guides && guides.length">
          <div v-if="!loaderStore.isLoading('guidesLoader')">
            <GuideList :guides="guides" />
          </div>
        </template>
      </div>
      <Pagination :pagination-key="`game-guides-${route.params.id}`" v-if="guides && guides.length" />
    </template>
    <template v-else>
      <Loader v-if="loaderStore.isLoading('igdbLoader')" loaderKey="igdbLoader" />
      <div v-if="igdbGame && !loaderStore.isLoading('igdbLoader')">
        <div class="card card-body mb-4 p-0">
          <GameDetails :game="igdbGame" :igdb_image="igdbGame.cover?.image_id" />
        </div>
        <div class="card card-body">
          Aucun guide n'a été créé pour ce jeu.
        </div>
      </div>
    </template>
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
const igdbGame = computed(() => gameStore.igdbGame);
const guides = computed(() => gameStore.guides);
const currentPage = computed(() => paginationStore.getPagination(`game-guides-${route.params.id}`).currentPage);
const pageSize = computed(() => paginationStore.getPagination(`game-guides-${route.params.id}`).pageSize);

const loadGameGuides = async () => {
  if (game) {
    await loadWithLoader(() => gameStore.loadGameGuides(route.params.id, { page: currentPage.value, size: pageSize.value }), 'guidesLoader');
  }
};

const loadGameData = async () => {
  try {
    await loadWithLoader(() => gameStore.loadGameByIgdbId(route.params.id), 'gameLoader');
    await loadGameGuides();
  } catch {
    await loadWithLoader(() => gameStore.loadGameFromIgdb(route.params.id), 'igdbLoader');
  }
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
