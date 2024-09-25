<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Email</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="user in users"
        :key="user.id"
        @click="goToDetails(user.id)"
        style="cursor: pointer;"
      >
        <th scope="row">{{ user.id }}</th>
        <td>{{ user.email }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { User } from '@/user/schemas/UserSchema';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps<{ users: User[] }>();

const goToDetails = (userId: number) => {
  router.push(`/users/${userId}`);
};
</script>
