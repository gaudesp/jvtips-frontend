<template>
  <div>
    <h1>Détails de l'utilisateur</h1>
    <Loader :loading="loaderStore.loading" />
    <template v-if="!loaderStore.loading">
      <template v-if="user">
        <UserDetails :user="user" />
        <h2>Guides de l'utilisateur</h2>
        <div v-if="guides.length">
          <GuideList :guides="guides" />
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
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/user/stores/UserStore';
import UserDetails from '@/user/components/UserDetails.vue';
import GuideList from '@/guide/components/GuideList.vue';
import Loader from '@/core/components/Loader.vue';
import { loadWithLoader } from '@/core/helpers/LoadingHelper';
import { useLoaderStore } from '@/core/stores/LoaderStore';

const route = useRoute();

const userStore = useUserStore();
const loaderStore = useLoaderStore();

const user = computed(() => userStore.user);
const guides = computed(() => userStore.guides);
const currentPage = computed(() => userStore.currentPage);
const totalPages = computed(() => userStore.totalPages);
const pageSize = computed(() => userStore.pageSize);

onMounted(async () => {
  await loadWithLoader(() => userStore.loadUserGuides(route.params.id, { page: currentPage.value, size: pageSize.value }));
});

const nextPage = async () => {
  if (currentPage.value < totalPages.value) {
    await loadWithLoader(() => userStore.loadUserGuides(route.params.id, { page: currentPage.value + 1, size: pageSize.value }));
  }
};

const prevPage = async () => {
  if (currentPage.value > 1) {
    await loadWithLoader(() => userStore.loadUserGuides(route.params.id, { page: currentPage.value - 1, size: pageSize.value }));
  }
};
</script>
