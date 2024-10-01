import { defineStore } from 'pinia';
import { authenticate } from '@/auth/services/AuthService';
import router from '@/router';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
  }),
  getters: {
    isAuthenticated(state): boolean {
      return !!state.token || !!localStorage.getItem('token');
    },
  },
  actions: {
    async signIn(email: string, password: string) {
      const response = await authenticate(email, password);
      this.token = response.access_token;
  
      if (this.token) {
        localStorage.setItem('token', this.token);
      }
  
      const redirectPath = router.currentRoute.value.query.redirect || '/';
      router.push(redirectPath as string);
    },

    signOut() {
      this.token = null;
      localStorage.removeItem('token');
      router.push('/sign-in');
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
