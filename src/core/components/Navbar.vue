<template>
  <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
    <div class="container">
      <router-link to="/" class="navbar-brand">JVTips</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item"><router-link to="/" class="nav-link" active-class="active">Accueil</router-link></li>
          <li class="nav-item"><router-link to="/users" class="nav-link" active-class="active">Membres</router-link></li>
        </ul>
        <form class="d-flex" data-bs-theme="light">
          <input class="form-control me-sm-2" type="search" placeholder="Search">
          <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
</template>
<script setup lang="ts">
</script>
