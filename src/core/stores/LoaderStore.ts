import { defineStore } from 'pinia';

export const useLoaderStore = defineStore('loader', {
  state: () => ({
    loading: false, // Initialisation de la propriété loading
  }),
  actions: {
    setLoading(isLoading: boolean) {
      this.loading = isLoading;
    },
  },
});
