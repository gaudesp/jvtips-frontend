<template>
    <div class="mt-6 position-fixed top-0 end-0 p-3" style="z-index: 11">
      <div
        v-for="alert in alerts"
        :key="alert.id"
        :class="`alert alert-${alert.type} alert-dismissible fade show mb-3`"
        role="alert"
      >
        {{ alert.message }}
        <button type="button" class="btn-close" @click="removeAlert(alert.id)" aria-label="Close"></button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import { useAlertStore } from '@/core/stores/AlertStore';
  
  const alertStore = useAlertStore();
  const alerts = computed(() => alertStore.alerts);
  
  const removeAlert = (id: number) => {
    alertStore.removeAlert(id);
  };
  </script>
  