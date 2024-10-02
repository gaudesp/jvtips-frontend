<template>
  <div class="mt-6 position-fixed top-0 end-0 p-3" style="z-index: 11">
    <transition name="fade-alert" mode="out-in">
      <div
        v-if="alerts.length"
        :key="alerts[0].id"
        :class="`alert alert-${alerts[0].type} alert-dismissible fade show`"
        role="alert"
      >
        {{ alerts[0].message }}
        <button
          type="button"
          class="btn-close"
          @click="removeAlert(alerts[0].id)"
          aria-label="Close"
        ></button>
      </div>
    </transition>
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

<style scoped>
.fade-alert-enter-active,
.fade-alert-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.fade-alert-enter-from,
.fade-alert-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
