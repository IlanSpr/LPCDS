<template>
  <div>
    <h1>Petit concours des streameurs</h1>
    <div>
      <button @click="$router.push('/phase-two')">Phase 2 : Choix de Catégories</button>
      <button @click="$router.push('/phase-three')">Phase 3 : Grille et Difficulté</button>
      <button @click="$router.push('/admin')">Admin</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>

<style>
button {
  margin: 10px;
  padding: 10px;
  font-size: 16px;
}
</style>
