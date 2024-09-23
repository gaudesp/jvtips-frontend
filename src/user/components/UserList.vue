<template>
  <div>
    <div v-for="user in users" :key="user.id">
      <h3>{{ user.email }}</h3>
      <p>{{ user.id }}</p>
      <router-link :to="`/users/${user.id}`">Voir Détails</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UserSchema } from '@/user/models/UserSchema';

const props = defineProps<{ users: UserSchema[] }>();
</script>
