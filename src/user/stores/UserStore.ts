import { defineStore } from 'pinia';
import { fetchUsers, fetchUserById, fetchUserGuides } from '@/user/services/UserService';
import type { User, Users } from '@/user/schemas/UserSchema';
import type { Guide, Guides } from '@/guide/schemas/GuideSchema';
import type { Params } from '@/core/schemas/PaginationSchema';
import { usePaginationStore } from '@/core/stores/PaginationStore';
import { useCacheStore } from '@/core/stores/CacheStore';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [] as User[],
    user: null as User | null,
    guides: [] as Guide[],
  }),
  actions: {
    async loadUsers(params: Params) {
      const cacheStore = useCacheStore();
      const paginationStore = usePaginationStore();
      const cacheKey = `users-${JSON.stringify(params)}`;

      const cachedUsers = cacheStore.getCachedData(cacheKey);
      if (cachedUsers) {
        this.users = cachedUsers.items;
        paginationStore.setPagination(
          'users',
          cachedUsers.current_page,
          cachedUsers.total_pages,
          params.size || paginationStore.getPagination('users').pageSize
        );
        return;
      }

      const users: Users = await fetchUsers(params);
      this.users = users.items;

      cacheStore.setCachedData(cacheKey, users);

      paginationStore.setPagination(
        'users',
        users.current_page,
        users.total_pages,
        params.size || paginationStore.getPagination('users').pageSize
      );
    },

    async loadUserById(id: string | string[]) {
      const cacheStore = useCacheStore();
      const cacheKey = `user-${id}`;

      const cachedUser = cacheStore.getCachedData(cacheKey);
      if (cachedUser) {
        this.user = cachedUser;
        return;
      }

      const user: User = await fetchUserById(id);
      this.user = user;

      cacheStore.setCachedData(cacheKey, user);
    },

    async loadUserGuides(userId: string | string[], params: Params) {
      const cacheStore = useCacheStore();
      const paginationStore = usePaginationStore();
      const cacheKey = `user-guides-${userId}-${JSON.stringify(params)}`;

      const cachedGuides = cacheStore.getCachedData(cacheKey);
      if (cachedGuides) {
        this.guides = cachedGuides.items;
        paginationStore.setPagination(
          cacheKey,
          cachedGuides.current_page,
          cachedGuides.total_pages,
          params.size || paginationStore.getPagination(cacheKey).pageSize
        );
        return;
      }

      const guides: Guides = await fetchUserGuides(userId, params);
      this.guides = guides.items;

      cacheStore.setCachedData(cacheKey, guides);

      paginationStore.setPagination(
        cacheKey,
        guides.current_page,
        guides.total_pages,
        params.size || paginationStore.getPagination(cacheKey).pageSize
      );
    },

    clearCache() {
      this.user = null;
      this.users = [];
      this.guides = [];
    },
  },
});
