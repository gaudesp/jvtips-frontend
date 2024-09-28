import { defineStore } from 'pinia';
import { searchGames } from '@/game/services/GameService';
import type { IgbdGame, IgbdGames } from '@/game/schemas/GameSchema';
import { ref } from 'vue';

export const useGameStore = defineStore('game', {
  state: () => ({
    searchResults: ref<IgbdGame[]>([]),
    noResults: ref(false),
    lastSearchQuery: ref(''),
  }),
  actions: {
    async loadGames(query: string) {
      if (query.length > 2) {
        if (query !== this.lastSearchQuery) {
          this.lastSearchQuery = query;

          try {
            const searchResults: IgbdGames = await searchGames(query);
            this.searchResults = searchResults.items;
            this.noResults = this.searchResults.length === 0;
          } catch (error) {
            console.error('Error loading games:', error);
            this.noResults = true;
          }
        } else {
          this.searchResults = this.searchResults;
          this.noResults = this.searchResults.length === 0;
        }
      } else {
        this.searchResults = [];
        this.noResults = false;
      }
    },
    clearSearchResults() {
      this.searchResults = [];
      this.noResults = false;
      this.lastSearchQuery = '';
    },
  },
});
