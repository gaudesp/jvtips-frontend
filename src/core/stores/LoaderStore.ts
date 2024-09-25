import { defineStore } from 'pinia';

export const useLoaderStore = defineStore('loader', {
  state: () => ({
    loading: {} as Record<string, boolean>,
  }),
  actions: {
    setLoading(loadingKey: string, isLoading: boolean) {
      this.loading[loadingKey] = isLoading;
    },
    isLoading(loadingKey: string) {
      return this.loading[loadingKey] || false;
    },
  },
});
