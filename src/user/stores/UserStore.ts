import { defineStore } from 'pinia';
import { fetchUsers, fetchUserById, fetchUserGuides } from '@/user/services/UserService';
import type { User, Users, UserGuides } from '@/user/schemas/UserSchema';
import type { Params } from '@/core/schemas/PaginationSchema';
import { usePaginationStore } from '@/core/stores/PaginationStore';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [] as User[] | [],
    user: null as User | null,
    userGuides: null as UserGuides | null,
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

      const userGuides: UserGuides = await fetchUserGuides(userId, params);
      this.userGuides = userGuides;

      paginationStore.setPagination(
        paginationKey,
        userGuides.guides.current_page,
        userGuides.guides.total_pages,
        params.size || paginationStore.getPagination(paginationKey).pageSize
      );
    },
  },
});
