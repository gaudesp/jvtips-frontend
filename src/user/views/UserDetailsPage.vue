<template>
  <div>
    <h1>Détails de l'utilisateur</h1>
    <Loader :loading="loaderStore.loading" />
    <template v-if="!loaderStore.loading">
      <template v-if="userGuides">
        <UserDetails :user="userGuides" />
        <h2>Guides de l'utilisateur</h2>
        
        <div v-if="guides.length">
          <GuideList :guides="userGuides.guides.items" />
          <Pagination :pagination-key="`user-guides-${route.params.id}`" />
        </div>
        <div v-else>
          <p>Aucun guide trouvé.</p>
        </div>
      </template>
      <template v-else>
        <p>Aucun utilisateur trouvé.</p>
      </template>
    </template>
    <router-link to="/users">Retour à la liste</router-link>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/user/stores/UserStore';
import UserDetails from '@/user/components/UserDetails.vue';
import GuideList from '@/guide/components/GuideList.vue';
import Loader from '@/core/components/Loader.vue';
import Pagination from '@/core/components/Pagination.vue';
import { loadWithLoader } from '@/core/helpers/LoadingHelper';
import { useLoaderStore } from '@/core/stores/LoaderStore';
import { usePaginationStore } from '@/core/stores/PaginationStore';

const route = useRoute();

const userStore = useUserStore();
const loaderStore = useLoaderStore();
const paginationStore = usePaginationStore();

const userGuides = computed(() => userStore.userGuides);
const guides = computed(() => userStore.userGuides?.guides.items || []);
const currentPage = computed(() => paginationStore.getPagination(`user-guides-${route.params.id}`).currentPage);
const totalPages = computed(() => userStore.userGuides?.guides.total_pages || 1);
const pageSize = computed(() => paginationStore.getPagination(`user-guides-${route.params.id}`).pageSize);

onMounted(async () => {
  await loadWithLoader(() => userStore.loadUserGuides(route.params.id, { page: currentPage.value, size: pageSize.value }));
});

watch(currentPage, async () => {
  await loadWithLoader(() => userStore.loadUserGuides(route.params.id, { page: currentPage.value, size: pageSize.value }));
});
</script>
