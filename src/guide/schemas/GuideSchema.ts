import type { Paginated } from '@/core/schemas/PaginationSchema';

export interface GuideBase {
  title: string;
  description: string;
  content: string;
}

export interface Guide extends GuideBase {
  id: number;
  game_id: number;
  user_id: number;
}

export interface Guides extends Paginated<Guide> {}
