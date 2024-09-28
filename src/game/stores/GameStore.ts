import { defineStore } from 'pinia';
import { usePaginationStore } from '@/core/stores/PaginationStore';
import { searchGames, fetchGameByIgdbId, fetchGameGuides } from '@/game/services/GameService';
import type { IgdbGame, IgdbGames, Game } from '@/game/schemas/GameSchema';
import type { Guide, Guides } from '@/guide/schemas/GuideSchema';
import { ref } from 'vue';
import type { Params } from '@/core/schemas/PaginationSchema';

export const useGameStore = defineStore('game', {
  state: () => ({
    searchResults: ref<IgdbGame[]>([]),
    noResults: ref(false),
    lastSearchQuery: ref(''),
    game: null as Game | null,
    guides: [] as Guide[],
  }),
  actions: {
    async loadSearchGames(query: string) {
      if (query !== this.lastSearchQuery) {
        this.lastSearchQuery = query;
        try {
          const searchResults: IgdbGames = await searchGames(query);
          this.searchResults = searchResults.items;
          this.noResults = this.searchResults.length === 0;
        } catch (error) {
          console.error('Error loading games:', error);
          this.noResults = true;
        }
      } else {
        await new Promise((resolve) => setTimeout(resolve, 200));
        this.searchResults = this.searchResults;
        this.noResults = this.searchResults.length === 0;
      }
    },
    async loadGameByIgdbId(igdbId: string | string[]) {
      const game: Game = await fetchGameByIgdbId(igdbId);
      this.game = game;
    },
    async loadGameGuides(gameId: string | string[], params: Params) {
      const paginationStore = usePaginationStore();
      const paginationKey = `game-guides-${gameId}`;

      const guides: Guides = await fetchGameGuides(gameId, params);
      this.guides = guides.items;

      paginationStore.setPagination(
        paginationKey,
        guides.current_page,
        guides.total_pages,
        params.size || paginationStore.getPagination(paginationKey).pageSize
      );
    },
    clearSearchResults() {
      this.searchResults = [];
      this.noResults = false;
      this.lastSearchQuery = '';
    },
    clearGameData() {
      this.game = null;
      this.guides = [];
    },
  },
});
