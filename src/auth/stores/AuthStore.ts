import { defineStore } from 'pinia';
import { authenticate } from '@/auth/services/AuthService';
import router from '@/router';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
    lastRoute: '/',
  }),
  getters: {
    isAuthenticated(state): boolean {
      return !!state.token || !!localStorage.getItem('token');
    },
  },
  actions: {
    setLastRoute(route: string) {
      this.lastRoute = route;
    },
    async signIn(email: string, password: string) {
      const response = await authenticate(email, password);
      this.token = response.access_token;

      if (this.token) {
        localStorage.setItem('token', this.token);
      }

      const redirectPath = this.lastRoute || '/';
      router.push(redirectPath);
    },

    signOut() {
      this.token = null;
      localStorage.removeItem('token');
    },

    getToken() {
      return this.token || localStorage.getItem('token');
    },

    initializeAuth() {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        this.token = storedToken;
      }
    },
  },
});
