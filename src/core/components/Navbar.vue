<template>
  <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
    <div class="container">
      <router-link to="/" class="navbar-brand">JVTips</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link" active-class="active">Accueil</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/users" class="nav-link" :class="{ active: isUsersRoute }">Membres</router-link>
          </li>
        </ul>
        <ul class="navbar-nav ms-md-auto">
          <li class="nav-item">
            <form
              class="d-flex position-relative me-2"
              style="width: 20rem; margin-top: 11px;"
              data-bs-theme="light"
              @submit.prevent="handleSearch"
              ref="searchForm"
            >
              <input
                v-model="searchQuery"
                @input="handleInput"
                class="form-control"
                type="search"
                placeholder="Rechercher un jeu"
                aria-label="Rechercher un jeu"
                @focus="updateDropdownVisibility"
              />

              <div
                v-if="showDropdown || loaderStore.isLoading('gamesLoader')"
                class="mt-5 dropdown-menu show w-100 shadow overflow-auto"
                ref="dropdown"
                style="max-height: 200px;"
              >
                <Loader v-if="loaderStore.isLoading('gamesLoader')" loaderKey="gamesLoader" />

                <template v-if="!loaderStore.isLoading('gamesLoader')">
                  <button v-if="noResults" class="dropdown-item disabled w-100" type="button">
                    Aucun jeu trouvé.
                  </button>

                  <button
                    v-for="igdbGame in searchResults"
                    :key="igdbGame.id"
                    class="dropdown-item d-flex justify-content-between align-items-center w-100"
                    type="button" 
                    @click="goToGame(igdbGame.id); closeDropdown"
                  >
                    <img v-if="igdbGame.cover" width="50" :src="`https://images.igdb.com/igdb/image/upload/t_thumb/${igdbGame.cover.image_id}.png`" class="me-2" />
                    <img v-else width="50" :src="`https://placehold.co/90`" class="me-2" />

                    <span class="flex-grow-1 text-truncate">{{ igdbGame.name }}</span>
                  </button>
                </template>
              </div>
            </form>
          </li>
          <li class="nav-item dropdown" data-bs-theme="light">
            <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" id="version-menu" aria-expanded="false" data-bs-toggle="dropdown" data-bs-display="static" aria-label="Toggle theme">
              <span><i class="bi bi-person-circle" style="font-size: 1.2rem;"></i></span>
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <a v-if="isAuthenticated" @click="handleSignOut" class="dropdown-item d-flex align-items-center justify-content-between" role="button" aria-current="true">Se déconnecter</a>
                <router-link v-else to="/sign-in" class="dropdown-item d-flex align-items-center justify-content-between" role="button" aria-current="true">Se connecter</router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useGameStore } from '@/game/stores/GameStore';
import { useLoaderStore } from '@/core/stores/LoaderStore';
import { useAlertStore } from '@/core/stores/AlertStore';
import { useAuthStore } from '@/auth/stores/AuthStore';
import { loadWithLoader } from '@/core/helpers/LoadingHelper';
import Loader from '@/core/components/Loader.vue';

const route = useRoute();
const router = useRouter();
const gameStore = useGameStore();
const loaderStore = useLoaderStore();
const authStore = useAuthStore();
const alertStore = useAlertStore();

const isAuthenticated = computed(() => !!authStore.getToken());
const isUsersRoute = computed(() => route.path.startsWith('/users'));
const searchQuery = ref('');
const showDropdown = ref(false);
const searchForm = ref<HTMLElement | null>(null);
const dropdown = ref<HTMLElement | null>(null);
let debounceTimeout: ReturnType<typeof setTimeout> | null = null;

const searchResults = computed(() => gameStore.searchResults);
const noResults = computed(() => gameStore.noResults);

const loadSearchGames = async () => {
  await loadWithLoader(async () => {
    await gameStore.loadSearchGames(searchQuery.value);
    showDropdown.value = true;
  }, 'gamesLoader');
};

const handleInput = () => {
  if (debounceTimeout) clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(async () => {
    if (searchQuery.value.length === 0) {
      showDropdown.value = false;
    } else {
      await loadSearchGames();
    }
  }, 1000);
};

const goToGame = (igdbId: number) => {
  router.push(`/games/${igdbId}`);
  searchQuery.value = '';
  closeDropdown();
};

const closeDropdown = () => {
  showDropdown.value = false;
};

const handleSearch = async () => {
  closeDropdown();
  if (debounceTimeout) clearTimeout(debounceTimeout);
  if (searchQuery.value.length > 0) await loadSearchGames();
};

const updateDropdownVisibility = () => {
  showDropdown.value = searchQuery.value.length > 0 && searchResults.value.length > 0;
};

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Node;
  if (searchForm.value && dropdown.value && !searchForm.value.contains(target) && !dropdown.value.contains(target)) {
    closeDropdown();
  }
};

const handleSignOut = () => {
  authStore.signOut();
  alertStore.addAlert('Déconnexion réussie!', 'success');
};

onMounted(() => {
  window.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside);
});

watch(route, closeDropdown);
</script>

<style scoped>
.navbar {
  padding: 0 !important;
}

.navbar .nav-link {
  padding: 1rem;
}
</style>
