import { defineStore } from 'pinia';
import { fetchUsers, fetchUserById, fetchUserGuides } from '@/user/services/UserService';
import type { User, Users } from '@/user/schemas/UserSchema';
import type { Guide, Guides } from '@/guide/schemas/GuideSchema';
import type { Params } from '@/core/schemas/PaginationSchema';
import { usePaginationStore } from '@/core/stores/PaginationStore';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [] as User[],
    user: null as User | null,
    guides: [] as Guide[],
  }),
  actions: {
    async loadUsers(params: Params) {
      const paginationStore = usePaginationStore();
      const paginationKey = 'users';

      const users: Users = await fetchUsers(params);
      this.users = users.items;

      paginationStore.setPagination(
        paginationKey,
        users.current_page,
        users.total_pages,
        params.size || paginationStore.getPagination(paginationKey).pageSize
      );
    },

    async loadUserById(id: string | string[]) {
      const user: User = await fetchUserById(id);
      this.user = user;
    },

    async loadUserGuides(userId: string | string[], params: Params) {
      const paginationStore = usePaginationStore();
      const paginationKey = `user-guides-${userId}`;

      const guides: Guides = await fetchUserGuides(userId, params);
      this.guides = guides.items;

      paginationStore.setPagination(
        paginationKey,
        guides.current_page,
        guides.total_pages,
        params.size || paginationStore.getPagination(paginationKey).pageSize
      );
    },
    clearUserData() {
      this.user = null;
      this.guides = [];
    },
  },
});
