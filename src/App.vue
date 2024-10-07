<template>
  <div id="app">
    <router-link to="/phase-two">Phase 2</router-link>
    <router-link to="/phase-three">Phase 3</router-link>
    <router-link to="/admin">Admin</router-link>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  text-align: center;
  padding: 20px;
}
</style>
