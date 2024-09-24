<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Email</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.id">
        <th scope="row">{{ user.id }}</th>
        <td>{{ user.email }}</td>
        <td><router-link :to="`/users/${user.id}`">Voir Détails</router-link></td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { User } from '@/user/schemas/UserSchema';

const props = defineProps<{ users: User[] }>();
</script>
