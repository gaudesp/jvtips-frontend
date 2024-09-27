<template>
  <div class="mt-4 text-center">
    <div class="btn-toolbar justify-content-center" role="toolbar" aria-label="Pagination navigation">
      <div class="btn-group me-2" role="group" aria-label="Previous group">
        <button 
          type="button" 
          class="btn btn-secondary"
          :disabled="currentPage === 1" 
          @click="prevPage" 
          aria-label="Précédent"
        >
          &laquo;
        </button>
      </div>

      <div class="btn-group" role="group" aria-label="Pages group">
        <button
          v-for="page in visiblePages"
          :key="page"
          type="button"
          class="btn"
          :class="{ 'btn-primary': page === currentPage, 'btn-secondary': page !== currentPage }"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>
      </div>

      <div class="btn-group ms-2" role="group" aria-label="Next group">
        <button 
          type="button" 
          class="btn btn-secondary"
          :disabled="currentPage === totalPages"
          @click="nextPage"
          aria-label="Suivant"
        >
          &raquo;
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { usePaginationStore } from '@/core/stores/PaginationStore';

const props = defineProps({
  paginationKey: {
    type: String,
    required: true
  }
});

const paginationStore = usePaginationStore();
const pagination = computed(() => paginationStore.getPagination(props.paginationKey));

const currentPage = computed(() => pagination.value.currentPage);
const totalPages = computed(() => pagination.value.totalPages);

const maxPages = ref(5);

const updateMaxPages = () => {
  const screenWidth = window.innerWidth;
  if (screenWidth < 576) {
    maxPages.value = 6;
  } else if (screenWidth < 768) {
    maxPages.value = 12;
  } else {
    maxPages.value = 20;
  }
};

onMounted(() => {
  updateMaxPages();
  window.addEventListener('resize', updateMaxPages);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateMaxPages);
});

const visiblePages = computed(() => {
  const range = [];
  let start = Math.max(currentPage.value - 2, 1);
  let end = Math.min(start + maxPages.value - 1, totalPages.value);

  if (end - start < maxPages.value - 1) {
    start = Math.max(1, end - maxPages.value + 1);
  }

  for (let i = start; i <= end; i++) {
    range.push(i);
  }

  return range;
});

const goToPage = (page: number) => {
  paginationStore.setPagination(props.paginationKey, page, totalPages.value, pagination.value.pageSize);
};

const nextPage = () => paginationStore.nextPage(props.paginationKey);
const prevPage = () => paginationStore.prevPage(props.paginationKey);
</script>
