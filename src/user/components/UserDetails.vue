<template>
  <div>
    <h3>{{ user.email }}</h3>
    <p><strong>ID :</strong> {{ user.id }}</p>
    <p><strong>Statut :</strong> {{ user.disabled ? 'Désactivé' : 'Activé' }}</p>
  </div>
</template>

<script setup lang="ts">
import type { User } from '@/user/schemas/UserSchema';
const props = defineProps<{
  user: User;
}>();
</script>
