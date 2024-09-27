import apiClient from '@/core/services/ApiService';
import type { IgbdGames } from '@/game/schemas/GameSchema';

export const searchGames = async (query: string): Promise<IgbdGames> => {
  const response = await apiClient.get('/games/search', { params: { query } });
  return response.data;
};
