import apiClient from '@/core/services/ApiService';
import type { User, UserCreate, Users } from '@/user/schemas/UserSchema';
import type { Guides } from '@/guide/schemas/GuideSchema';
import type { Params } from '@/core/schemas/PaginationSchema';

export const createUser = async (data: UserCreate): Promise<User> => {
  const response = await apiClient.post('/users', data);
  return response.data;
};

export const fetchUsers = async (params: Params): Promise<Users> => {
  const response = await apiClient.get('/users', { params });
  return response.data;
};

export const fetchUserById = async (userId: string | string[]): Promise<User> => {
  const response = await apiClient.get(`/users/${userId}`);
  return response.data;
};

export const fetchUserGuides = async (userId: string | string[], params: Params): Promise<Guides> => {
  const response = await apiClient.get(`/users/${userId}/guides`, { params });
  return response.data;
};
