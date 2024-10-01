import apiClient from '@/core/services/ApiService';

export const authenticate = async (email: string, password: string) => {
  const response = await apiClient.post('/auth/token', {
    email,
    password,
  });
  return response.data;
};
