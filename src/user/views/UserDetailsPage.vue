<template>
  <div class="mt-4 container">
    <div class="card card-body mb-4">
      <Loader v-if="loaderStore.isLoading('userLoader')" loaderKey="userLoader" />
      <template v-if="user">
        <div v-if="!loaderStore.isLoading('userLoader')">
          <UserDetails :user="user" />
        </div>
      </template>
      <router-link to="/users">Retour à la liste</router-link>
    </div>
    <div class="card card-body" v-if="user">
      <Loader v-if="loaderStore.isLoading('guidesLoader')" loaderKey="guidesLoader" />
      <template v-if="guides && guides.length">
        <div v-if="!loaderStore.isLoading('guidesLoader')">
          <GuideList :guides="guides" />
          <Pagination :pagination-key="`user-guides-${route.params.id}`" />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, watch } from 'vue';
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

onBeforeUnmount(() => {
  userStore.clearUserData();
});

watch(currentPage, async () => {
  await loadUserGuides();
});
</script>
