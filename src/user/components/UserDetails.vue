<template>
  <div>
    <h3>{{ user.email }}</h3>
    <p><strong>ID :</strong> {{ user.id }}</p>
    <p><strong>Statut :</strong> {{ user.disabled ? 'Désactivé' : 'Activé' }}</p>
  </div>
</template>

<script setup lang="ts">
import { UserSchema } from '@/user/models/UserSchema';
const props = defineProps<{
  user: UserSchema;
}>();
</script>
