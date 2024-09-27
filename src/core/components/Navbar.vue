<template>
  <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
    <div class="container">
      <router-link to="/" class="navbar-brand">JVTips</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarColor01"
        aria-controls="navbarColor01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link" active-class="active">Accueil</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/users" class="nav-link" :class="{ active: isUsersRoute }">Membres</router-link>
          </li>
        </ul>

        <form
          class="d-flex position-relative w-50"
          data-bs-theme="light"
          @submit.prevent="handleSearch"
          ref="searchForm"
        >
          <input
            v-model="searchQuery"
            @input="handleInput"
            class="form-control me-2"
            type="search"
            placeholder="Rechercher un jeu"
            aria-label="Rechercher un jeu"
            @focus="updateDropdownVisibility"
          />
          <button class="btn btn-secondary" type="submit">Search</button>

          <div
            v-if="showDropdown || loaderStore.isLoading('gamesLoader')"
            class="mt-5 dropdown-menu show w-100 mt-2 shadow"
            ref="dropdown"
          >
            <Loader v-if="loaderStore.isLoading('gamesLoader')" loaderKey="gamesLoader" />

            <template v-if="!loaderStore.isLoading('gamesLoader')">
              <button v-if="noResults" class="dropdown-item disabled" type="button">
                Aucun jeu trouvé.
              </button>

              <button
                v-for="game in searchResults"
                :key="game.id"
                class="dropdown-item"
                type="button"
                @click="goToGame(game.id); closeDropdown"
              >
                {{ game.name }}
              </button>
            </template>
          </div>
        </form>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useGameStore } from '@/game/stores/GameStore';
import { useLoaderStore } from '@/core/stores/LoaderStore';
import { loadWithLoader } from '@/core/helpers/LoadingHelper';
import Loader from '@/core/components/Loader.vue';

const route = useRoute();
const router = useRouter();
const isUsersRoute = computed(() => route.path.startsWith('/users'));

const gameStore = useGameStore();
const loaderStore = useLoaderStore();

const searchQuery = ref('');
const showDropdown = ref(false);
const searchForm = ref<HTMLElement | null>(null);
const dropdown = ref<HTMLElement | null>(null);
let debounceTimeout: ReturnType<typeof setTimeout> | null = null;

const handleInput = () => {
  if (debounceTimeout) {
    clearTimeout(debounceTimeout);
  }

  debounceTimeout = setTimeout(async () => {
    if (searchQuery.value.length === 0) {
      gameStore.clearSearchResults();
      showDropdown.value = false;
      return;
    }

    await loadWithLoader(async () => {
      await gameStore.loadGames(searchQuery.value);
      showDropdown.value = true;
    }, 'gamesLoader');
  }, 1000);
};

const goToGame = (gameId: number) => {
  router.push(`/games/${gameId}`);
  searchQuery.value = '';
  closeDropdown();
};

const closeDropdown = () => {
  showDropdown.value = false;
};

const handleSearch = async () => {
  closeDropdown();

  if (debounceTimeout) {
    clearTimeout(debounceTimeout);
  }

  if (searchQuery.value.length > 0) {
    await loadWithLoader(async () => {
      await gameStore.loadGames(searchQuery.value);
      showDropdown.value = true;
    }, 'gamesLoader');
  }
};

const updateDropdownVisibility = () => {
  showDropdown.value = searchQuery.value.length > 0 && gameStore.searchResults.length > 0;
};

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Node;
  
  if (searchForm.value && dropdown.value && 
      !searchForm.value.contains(target) && 
      !dropdown.value.contains(target)) {
    closeDropdown();
  }
};

onMounted(() => {
  window.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside);
});

watch(route, () => {
  closeDropdown();
});

const searchResults = computed(() => gameStore.searchResults);
const noResults = computed(() => gameStore.noResults);
</script>

<style scoped>
.navbar {
  padding: 0 !important;
}

.navbar .nav-link {
  padding: 1rem;
}
</style>
