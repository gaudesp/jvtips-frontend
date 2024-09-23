<template>
  <div class="loader" v-if="loading">
    <div class="spinner"></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ loading: boolean }>();
</script>

<style scoped>
.loader {
  height: 100vh;
}

.spinner {
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-left-color: #333;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
