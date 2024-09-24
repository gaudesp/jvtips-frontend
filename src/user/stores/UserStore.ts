import { defineStore } from 'pinia';
import { fetchUsers, fetchUserById, fetchUserGuides } from '@/user/services/UserService';
import type { User, Users, UserGuides } from '@/user/schemas/UserSchema';
import type { Guide } from '@/guide/schemas/GuideSchema';
import type { Params } from '@/core/schemas/PaginationSchema';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [] as User[] | [],
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
    pageSize: 5,
    user: null as User | null,
    guides: [] as Guide[] | [],
  }),
  actions: {
    async loadUsers(params: Params) {
      const users: Users = await fetchUsers(params);
      this.users = users.items;
      this.totalItems = users.total_items;
      this.totalPages = users.total_pages;
      this.currentPage = users.current_page;
    },
    async loadUserById(id: string | string[]) {
      const user: User = await fetchUserById(id);
      this.user = user;
    },
    async loadUserGuides(userId: string | string[], params: Params) {
      const userGuides: UserGuides = await fetchUserGuides(userId, params);
      this.user = userGuides;
      this.guides = userGuides.guides.items;
      this.totalItems = userGuides.guides.total_items;
      this.totalPages = userGuides.guides.total_pages;
      this.currentPage = userGuides.guides.current_page;
    },
  },
});
