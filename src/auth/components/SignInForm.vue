<template>
  <form @submit.prevent="handleSignIn">
    <div class="form-floating mb-3">
      <input
        type="email"
        id="email"
        v-model="email"
        class="form-control"
        required
        placeholder="Entrez votre email"
        :disabled="loaderStore.isLoading('signinLoader')"
      />
      <label for="email" class="form-label">Email</label>
    </div>
    <div class="form-floating mb-3">
      <input
        type="password"
        id="password"
        v-model="password"
        class="form-control"
        required
        placeholder="Entrez votre mot de passe"
        :disabled="loaderStore.isLoading('signinLoader')"
      />
      <label for="password" class="form-label">Mot de passe</label>
    </div>
    <button type="submit" class="btn btn-primary w-100" :disabled="loaderStore.isLoading('signinLoader')">
      <span v-if="loaderStore.isLoading('signinLoader')" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      <span v-else>Se connecter</span>
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/auth/stores/AuthStore';
import { loadWithLoader } from '@/core/helpers/LoadingHelper';
import { useLoaderStore } from '@/core/stores/LoaderStore';

const authStore = useAuthStore();
const loaderStore = useLoaderStore();

const email = ref('');
const password = ref('');

const handleSignIn = async () => {
  await loadWithLoader(() => authStore.signIn(email.value, password.value), 'signinLoader');
};
</script>
