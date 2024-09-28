import apiClient from '@/core/services/ApiService';
import type { IgdbGames } from '@/game/schemas/GameSchema';

export const searchGames = async (query: string): Promise<IgdbGames> => {
  const response = await apiClient.get('/games/search', { params: { query } });
  return response.data;
};
