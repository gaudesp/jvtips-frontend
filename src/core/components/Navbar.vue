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
            v-if="showDropdown"
            class="mt-5 dropdown-menu show w-100 mt-2 shadow"
            ref="dropdown"
          >
            <button v-if="noResults" class="dropdown-item disabled" type="button">No games found.</button>

            <button
              v-for="game in searchResults"
              :key="game.id"
              class="dropdown-item"
              type="button"
              @click="goToGame(game.id); closeDropdown"
            >
              {{ game.name }}
            </button>
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

const route = useRoute();
const router = useRouter();
const isUsersRoute = computed(() => route.path.startsWith('/users'));

const gameStore = useGameStore();

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

    await gameStore.loadGames(searchQuery.value);
    showDropdown.value = gameStore.searchResults.length > 0;
  }, 1000);
};

// Function to navigate to the selected game
const goToGame = (gameId: number) => {
  router.push(`/games/${gameId}`);
  searchQuery.value = '';
  closeDropdown();
};

// Function to close the dropdown
const closeDropdown = () => {
  showDropdown.value = false;
};

// Function to handle search form submission
const handleSearch = async () => {
  closeDropdown();

  if (debounceTimeout) {
    clearTimeout(debounceTimeout);
  }

  if (searchQuery.value.length > 0) {
    await gameStore.loadGames(searchQuery.value);
    showDropdown.value = gameStore.searchResults.length > 0;
  }
};

// Function to update dropdown visibility based on search results
const updateDropdownVisibility = () => {
  showDropdown.value = searchQuery.value.length > 0 && gameStore.searchResults.length > 0;
};

// Function to handle clicks outside the dropdown
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Node;
  
  // Check if the click was outside the dropdown and search form
  if (searchForm.value && dropdown.value && 
      !searchForm.value.contains(target) && 
      !dropdown.value.contains(target)) {
    closeDropdown();
  }
};

// Attach event listener for clicks outside
onMounted(() => {
  window.addEventListener('click', handleClickOutside);
});

// Clean up event listener
onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside);
});

// Watch for route changes and close the dropdown
watch(route, () => {
  closeDropdown();
});

// Computed properties for search results and no results
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
