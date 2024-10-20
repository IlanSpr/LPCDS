<template>
  <div class="admin-page scrollable-content">
    <router-link to="/home" class="back-button"> <i class="fas fa-arrow-left"></i> ← </router-link>

    <h1 class="header">Gestion des Phases</h1>

    <phase-2-admin />
    <div style="margin-top: 25px"></div>
    <phase-3-admin />
  </div>
</template>

<script>
import Phase2Admin from './Phase2Admin.vue'
import Phase3Admin from './Phase3Admin.vue'

export default {
  components: {
    Phase2Admin,
    Phase3Admin
  }
}
</script>

<style scoped>
.admin-page {
  padding: 20px;
  max-height: 100vh;
  overflow-y: auto;
}

.scrollable-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.back-button {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 10px 20px;
  font-size: 2rem;
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  transition: background-color 0.3s;
  text-decoration: none;
}

.header {
  color: white;
  text-shadow: 2px 2px 2px black;
}
</style>
