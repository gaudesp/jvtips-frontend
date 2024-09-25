<template>
  <div>
    <h3>{{ user.email }}</h3>
    <div class="d-flex">
      <span class="badge bg-secondary me-1">{{ user.id }}</span>
      <span class="badge bg-danger" v-if="user.disabled">Désactivé</span>
      <span class="badge bg-success" v-if="!user.disabled">Activé</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '@/user/schemas/UserSchema';
const props = defineProps<{
  user: User;
}>();
</script>
