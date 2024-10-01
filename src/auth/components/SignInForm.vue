<template>
  <div class="container mt-5">
    <h2 class="text-center">Connexion</h2>
    <form @submit.prevent="handleSignIn">
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          class="form-control"
          required
          placeholder="Entrez votre email"
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Mot de passe</label>
        <input
          type="password"
          id="password"
          v-model="password"
          class="form-control"
          required
          placeholder="Entrez votre mot de passe"
        />
      </div>
      <div v-if="errorMessage" class="alert alert-danger" role="alert">
        {{ errorMessage }}
      </div>
      <button type="submit" class="btn btn-primary w-100">Se connecter</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/auth/stores/AuthStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const email = ref('');
const password = ref('');
const errorMessage = ref('');

const handleSignIn = async () => {
  await authStore.signIn(email.value, password.value);
  router.push('/');
};
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: auto;
}
</style>
