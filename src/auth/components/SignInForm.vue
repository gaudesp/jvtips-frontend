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
      />
      <label for="password" class="form-label">Mot de passe</label>
    </div>
    <button type="submit" class="btn btn-primary w-100">Se connecter</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/auth/stores/AuthStore';
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

