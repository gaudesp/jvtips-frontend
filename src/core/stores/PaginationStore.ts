import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePaginationStore = defineStore('pagination', () => {
  const paginations = ref<Record<string, { currentPage: number; totalPages: number; pageSize: number }>>({});

  const setPagination = (key: string, currentPage: number, totalPages: number, pageSize: number) => {
    paginations.value[key] = { currentPage, totalPages, pageSize };
  };

  const getPagination = (key: string) => {
    return paginations.value[key] || { currentPage: 1, totalPages: 1, pageSize: 10 };
  };

  const nextPage = (key: string) => {
    const pagination = paginations.value[key];
    if (pagination && pagination.currentPage < pagination.totalPages) {
      pagination.currentPage += 1;
    }
  };

  const prevPage = (key: string) => {
    const pagination = paginations.value[key];
    if (pagination && pagination.currentPage > 1) {
      pagination.currentPage -= 1;
    }
  };

  return { paginations, setPagination, getPagination, nextPage, prevPage };
});
