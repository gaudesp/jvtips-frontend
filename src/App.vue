<template>
  <div>
    <NavbarLayout />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import NavbarLayout from '@/core/views/NavbarLayout.vue';
</script>
