import { defineStore } from 'pinia';

export const useAlertStore = defineStore('alert', {
  state: () => ({
    alerts: [] as Array<{ id: number; message: string; type: string }>,
    nextId: 1,
  }),
  actions: {
    addAlert(message: string, type: 'success' | 'danger' | 'info' | 'warning') {
      const alert = { id: this.nextId++, message, type };
      this.alerts.push(alert);

      setTimeout(() => {
        this.removeAlert(alert.id);
      }, 5000);
    },
    removeAlert(id: number) {
      this.alerts = this.alerts.filter(alert => alert.id !== id);
    },
  },
});
