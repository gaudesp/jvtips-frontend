<template>
  <h3 class="text-center">Connexion</h3>
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
    <button type="submit" class="btn btn-primary w-100">Se connecter</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/auth/stores/AuthStore';
import { useRouter } from 'vue-router';
import { useAlertStore } from '@/core/stores/AlertStore';

const authStore = useAuthStore();
const alertStore = useAlertStore();

const email = ref('');
const password = ref('');

const handleSignIn = async () => {
  try {
    await authStore.signIn(email.value, password.value);
    alertStore.addAlert('Connexion réussie!', 'success');
  } catch (error) {
    alertStore.addAlert('Identifiants incorrects.', 'warning');
  }
};
</script>

