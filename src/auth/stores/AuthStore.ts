import { defineStore } from 'pinia';
import { authenticate } from '@/auth/services/AuthService';
import router from '@/router';
import { useAlertStore } from '@/core/stores/AlertStore';
import { useCacheStore } from '@/core/stores/CacheStore';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
    lastRoute: '/' as string,
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
      const alertStore = useAlertStore();
      try {
        if (!this.token && !localStorage.getItem('token')) {
          const response = await authenticate(email, password);
          this.token = response.access_token;

          if (this.token) {
            localStorage.setItem('token', this.token);
          }
        } else {
          this.token = this.getToken();
        }

        const redirectPath = this.lastRoute || '/';
        router.push(redirectPath);

        alertStore.addAlert('Connexion réussie!', 'success');
      } catch (error) {
        alertStore.addAlert('Identifiants incorrects.', 'warning');
      }
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
