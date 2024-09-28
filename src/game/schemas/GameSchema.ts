import type { Paginated } from '@/core/schemas/PaginationSchema';
import type { Guides } from '@/guide/schemas/GuideSchema';

export interface IgdbCover {
  id: number;
  image_id: string;
}

export interface IgdbGame {
  id: number;
  category: number;
  name: string;
  cover?: IgdbCover;
}

export interface IgdbGames {
  items: IgdbGame[];
}

export interface GameBase {
  name: string;
  igdb_id: number
}

export interface GameCreate extends GameBase {
  name: string;
  igdb_id: number
}

export interface Game extends GameBase {
  id: number;
}

export interface Games extends Paginated<Game> {}

export interface GameGuides extends Game {
  guides: Guides;
}
