import { defineStore } from 'pinia';

export const useCacheStore = defineStore('cache', {
  state: () => ({
    cache: {} as Record<string, any>,
  }),
  actions: {
    getCachedData(key: string) {
      return this.cache[key] || null;
    },

    setCachedData(key: string, data: any) {
      this.cache[key] = data;
    },

    clearCache(key: string) {
      delete this.cache[key];
    },

    clearAllCache() {
      this.cache = {};
    },
  },
});
