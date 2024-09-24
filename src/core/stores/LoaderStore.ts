import { defineStore } from 'pinia';

export const useLoaderStore = defineStore('loader', {
  state: () => ({
    loading: false,
  }),
  actions: {
    setLoading(isLoading: boolean) {
      this.loading = isLoading;
    },
  },
});
