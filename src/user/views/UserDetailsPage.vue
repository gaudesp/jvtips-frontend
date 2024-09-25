<template>
  <div>
    <h1>Détails de l'utilisateur</h1>
    <Loader v-if="loaderStore.isLoading('userLoader')" loaderKey="userLoader" />
    
    <template v-if="!loaderStore.isLoading('userLoader')">
      <template v-if="user">
        <UserDetails :user="user" />
        <h2>Guides de l'utilisateur</h2>
        
        <Loader v-if="loaderStore.isLoading('guidesLoader')" loaderKey="guidesLoader" />
        <div v-if="guides.length && !loaderStore.isLoading('guidesLoader')">
          <GuideList :guides="guides" />
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

const user = computed(() => userStore.user);
const guides = computed(() => userStore.guides);
const currentPage = computed(() => paginationStore.getPagination(`user-guides-${route.params.id}`).currentPage);
const pageSize = computed(() => paginationStore.getPagination(`user-guides-${route.params.id}`).pageSize);

const loadUserGuides = async () => {
  await loadWithLoader(() => userStore.loadUserGuides(route.params.id, { page: currentPage.value, size: pageSize.value }), 'guidesLoader');
};

onMounted(async () => {
  await loadWithLoader(() => userStore.loadUserById(route.params.id), 'userLoader');
  await loadUserGuides();
});

watch(currentPage, async () => {
  await loadUserGuides();
});
</script>
