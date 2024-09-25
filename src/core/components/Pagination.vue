<template>
  <nav class="mt-4" aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <button class="page-link" @click="prevPage" aria-label="Précédent">
          <span aria-hidden="true">&laquo;</span>
        </button>
      </li>

      <li
        v-for="page in visiblePages"
        :key="page"
        class="page-item"
        :class="{ active: page === currentPage }"
      >
        <button class="page-link" @click="goToPage(page)">{{ page }}</button>
      </li>

      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <button class="page-link" @click="nextPage" aria-label="Suivant">
          <span aria-hidden="true">&raquo;</span>
        </button>
      </li>
    </ul>
  </nav>
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

<style scoped>
.page-link {
  cursor: pointer;
}
.page-item.disabled .page-link {
  pointer-events: none;
  opacity: 0.5;
}
</style>
