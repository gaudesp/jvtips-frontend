import type { Paginated } from '@/core/schemas/PaginationSchema';
import type { Guides } from '@/guide/schemas/GuideSchema';

export interface IgdbCover {
  id: number;
  image_id: string;
}

export interface IgdbSearchGame {
  id: number;
  category: number;
  name: string;
  cover?: IgdbCover;
}

export interface IgdbGame {
  id: number;
  name: string
  cover: IgdbCover;
}

export interface IgdbSearchGames {
  items: IgdbSearchGame[];
}

export interface GameBase {
  name: string;
}

export interface GameCreate extends GameBase {
  igdb_id: number
}

export interface Game extends GameBase {
  id: number;
  igdb_id: number;
  igdb_image: string;
}

export interface Games extends Paginated<Game> {}

export interface GameGuides extends Game {
  guides: Guides;
}
