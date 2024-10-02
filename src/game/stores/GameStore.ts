import { defineStore } from 'pinia';
import { usePaginationStore } from '@/core/stores/PaginationStore';
import { useCacheStore } from '@/core/stores/CacheStore';
import { searchGames, fetchGameByIgdbId, fetchGameGuides, fetchGameFromIgdb } from '@/game/services/GameService';
import type { IgdbSearchGame, IgdbSearchGames, IgdbGame, Game } from '@/game/schemas/GameSchema';
import type { Guide, Guides } from '@/guide/schemas/GuideSchema';
import type { Params } from '@/core/schemas/PaginationSchema';
import { ref } from 'vue';

export const useGameStore = defineStore('game', {
  state: () => ({
    searchResults: ref<IgdbSearchGame[]>([]),
    noResults: ref(false),
    game: null as Game | null,
    guides: [] as Guide[],
    igdbGame: null as IgdbGame | null,
  }),
  actions: {
    async loadSearchGames(query: string) {
      const cacheStore = useCacheStore();
      const cacheKey = `search-games-${query}`;

      const cachedResults = cacheStore.getCachedData(cacheKey);
      if (cachedResults) {
        this.searchResults = cachedResults;
        this.noResults = cachedResults.length === 0;
        return;
      }

      try {
        const searchResults: IgdbSearchGames = await searchGames(query);
        this.searchResults = searchResults.items;
        this.noResults = this.searchResults.length === 0;

        cacheStore.setCachedData(cacheKey, this.searchResults);
      } catch (error) {
        console.error('Error loading games:', error);
        this.noResults = true;
      }
    },

    async loadGameFromIgdb(igdbId: string | string[]) {
      const cacheStore = useCacheStore();
      const cacheKey = `igdb-game-${igdbId}`;

      const cachedIgdbGame = cacheStore.getCachedData(cacheKey);
      if (cachedIgdbGame) {
        this.igdbGame = cachedIgdbGame;
        return;
      }

      const igdbGame: IgdbGame = await fetchGameFromIgdb(igdbId);
      this.igdbGame = igdbGame;
      cacheStore.setCachedData(cacheKey, igdbGame);
    },

    async loadGameByIgdbId(igdbId: string | string[]) {
      const cacheStore = useCacheStore();
      const cacheKey = `game-${igdbId}`;

      const cachedGame = cacheStore.getCachedData(cacheKey);
      if (cachedGame) {
        this.game = cachedGame;
        return;
      }

      const game: Game = await fetchGameByIgdbId(igdbId);
      this.game = game;
      cacheStore.setCachedData(cacheKey, game);
    },

    async loadGameGuides(gameId: string | string[], params: Params) {
      const cacheStore = useCacheStore();
      const paginationStore = usePaginationStore();
      const cacheKey = `game-guides-${gameId}-${JSON.stringify(params)}`;

      const cachedGuides = cacheStore.getCachedData(cacheKey);
      if (cachedGuides) {
        this.guides = cachedGuides.items;
        paginationStore.setPagination(
          cacheKey,
          cachedGuides.current_page,
          cachedGuides.total_pages,
          params.size || paginationStore.getPagination(cacheKey).pageSize
        );
        return;
      }

      const guides: Guides = await fetchGameGuides(gameId, params);
      this.guides = guides.items;

      cacheStore.setCachedData(cacheKey, guides);

      paginationStore.setPagination(
        cacheKey,
        guides.current_page,
        guides.total_pages,
        params.size || paginationStore.getPagination(cacheKey).pageSize
      );
    },

    clearCache() {
      this.game = null;
      this.guides = [];
      this.igdbGame = null;
      this.searchResults = [];
      this.noResults = false;
    },
  },
});
