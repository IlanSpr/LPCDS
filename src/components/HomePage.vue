<template>
  <div class="home-page">
    <h1>Petit concours des streameurs</h1>
    <div class="button-column">
      <BaseButton @click="$router.push('/phase-two')" text="Phase 2" />
      <BaseButton @click="$router.push('/phase-three')" text="Phase 3" />
      <BaseButton @click="$router.push('/admin')" text="Configuration" />
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue'

export default {
  name: 'HomePage',
  components: {
    BaseButton
  }
}
</script>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}

h1 {
  color: white; /* White text color */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7); /* Shadow effect */
  margin-bottom: 20px;
  font-size: 48px;
  position: absolute; /* Positioning */
  top: 20px; /* Position from the top */
  left: 50%;
  transform: translateX(-50%); /* Center horizontally */
}

.button-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; /* Center the buttons */
  height: calc(100vh - 100px); /* Allow space for the h1 */
  gap: 25px; /* Spacing between buttons */
}
</style>
