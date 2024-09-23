import type { Paginated } from '@/core/schemas/PaginationSchema';
import { Guides } from '@/guide/schemas/GuideSchema';

export interface UserBase {
  email: string;
}

export interface UserCreate extends UserBase {
  password: string;
}

export interface User extends UserBase {
  id: number;
  disabled: boolean;
}

export interface Users extends Paginated<User> {}

export interface UserGuides extends User {
  guides: Guides;
}
