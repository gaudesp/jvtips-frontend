import apiClient from '@/core/services/ApiService';
import type { IgdbSearchGames, IgdbGame, Game } from '@/game/schemas/GameSchema';
import type { Guides } from '@/guide/schemas/GuideSchema';
import type { Params } from '@/core/schemas/PaginationSchema';

export const searchGames = async (query: string): Promise<IgdbSearchGames> => {
  const response = await apiClient.get('/games/search', { params: { query } });
  return response.data;
};

export const fetchGameByIgdbId = async (igdbId: string | string[]): Promise<Game> => {
  const response = await apiClient.get(`/games/${igdbId}`);
  return response.data;
};

export const fetchGameGuides = async (gameId: string | string[], params: Params): Promise<Guides> => {
  const response = await apiClient.get(`/games/${gameId}/guides`, { params });
  return response.data;
};

export const fetchGameFromIgdb = async (igdbId: string | string[]): Promise<IgdbGame> => {
  const response = await apiClient.get(`/games/${igdbId}/igdb`);
  return response.data;
};
