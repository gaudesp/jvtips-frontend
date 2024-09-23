import { defineStore } from 'pinia';
import { fetchUsers, fetchUserById, fetchUserGuides } from '@/user/services/UserService';
import type { User, Users, UserGuide } from '@/user/schemas/UserSchema';
import type { Params } from '@/core/schemas/PaginationSchema';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [] as User[] | null,
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
    pageSize: 5,
    user: null as User | null,
  }),
  actions: {
    async loadUsers(params: Params) {
      const users: Users = await fetchUsers(params);
      this.users = users.items;
      this.totalItems = users.total_items;
      this.totalPages = users.total_pages;
      this.currentPage = users.current_page;
    },
    async loadUserById(id: string) {
      const user: User = await fetchUserById(id);
      this.user = user;
    },
    async loadUserGuides(userId: number, params: Params) {
      const user: UserGuides = await fetchUserGuides(userId, params);
      this.user = user;
      this.user.guides = user.guides.items;
      this.totalItems = user.guides.total_items;
      this.totalPages = user.guides.total_pages;
      this.currentPage = user.guides.current_page;
    },
  },
});
