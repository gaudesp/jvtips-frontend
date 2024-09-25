<template>
  <div class="mt-4 container">
    <div class="card">
      <div class="card-body">
        <Loader v-if="loaderStore.isLoading('usersLoader')" loaderKey="usersLoader" />
        <template v-if="!loaderStore.isLoading('usersLoader')">
          <template v-if="users && users.length">
            <UserList :users="users" />
            <Pagination :pagination-key="'users'" />
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
import { computed, onMounted, watch } from 'vue';
import UserList from '@/user/components/UserList.vue';
import Loader from '@/core/components/Loader.vue';
import Pagination from '@/core/components/Pagination.vue';
import { useUserStore } from '@/user/stores/UserStore';
import { useLoaderStore } from '@/core/stores/LoaderStore';
import { usePaginationStore } from '@/core/stores/PaginationStore';
import { loadWithLoader } from '@/core/helpers/LoadingHelper';

const userStore = useUserStore();
const loaderStore = useLoaderStore();
const paginationStore = usePaginationStore();

const users = computed(() => userStore.users);
const currentPage = computed(() => paginationStore.getPagination('users').currentPage);
const pageSize = computed(() => paginationStore.getPagination('users').pageSize);

const loadUsers = async () => {
  await loadWithLoader(async () => {
    await userStore.loadUsers({
      page: currentPage.value,
      size: pageSize.value
    });
  }, 'usersLoader');
};

onMounted(async () => {
  await loadUsers();
});

watch(currentPage, async () => {
  await loadUsers();
});
</script>
