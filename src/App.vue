<template>
  <div id="app">
    <Navbar />
    <main class="flex-grow">
      <Alert />
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/core/components/Navbar.vue';
import Footer from '@/core/components/Footer.vue';
import Alert from '@/core/components/Alert.vue';
</script>

<style>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex-grow: 1;
}
</style>
