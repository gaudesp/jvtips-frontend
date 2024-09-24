<template>
  <div class="mt-4 container">
    <div class="card">
      <div class="card-body">
        <Loader :loading="loaderStore.loading" />
        <template v-if="!loaderStore.loading">
        <template v-if="users && users.length">
          <UserList :users="users" />
          <div>
            <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
            <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
          </div>
        </template>
        <template v-else>
          <span>Aucun utilisateur trouvé.</span>
        </template>
      </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/user/stores/UserStore';
import { computed, onMounted } from 'vue';
import UserList from '@/user/components/UserList.vue';
import Loader from '@/core/components/Loader.vue';
import { loadWithLoader } from '@/core/helpers/LoadingHelper';
import { useLoaderStore } from '@/core/stores/LoaderStore';

const userStore = useUserStore();
const loaderStore = useLoaderStore();

const users = computed(() => userStore.users);
const currentPage = computed(() => userStore.currentPage);
const totalPages = computed(() => userStore.totalPages);
const pageSize = computed(() => userStore.pageSize);

onMounted(async () => {
  await loadWithLoader(() => userStore.loadUsers({ page: currentPage.value, size: pageSize.value }));
});

const nextPage = async () => {
  if (currentPage.value < totalPages.value) {
    await loadWithLoader(() => userStore.loadUsers({ page: currentPage.value + 1, size: pageSize.value }));
  }
};

const prevPage = async () => {
  if (currentPage.value > 1) {
    await loadWithLoader(() => userStore.loadUsers({ page: currentPage.value - 1, size: pageSize.value }));
  }
};
</script>
