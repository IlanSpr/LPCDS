<template>
  <div id="app">
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
  font-family: Roboto, sans-serif;
  text-align: center;
  padding: 10px;
  background-color: lightblue;
  min-height: 100vh;
}
/* Global settings to prevent scrolling */
html,
body {
  height: 100%;
  margin: 0;
  overflow: hidden; /* Ensure no scrolling on the page */
}
</style>
