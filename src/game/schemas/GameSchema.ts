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
