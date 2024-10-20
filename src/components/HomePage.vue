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
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  margin-bottom: 20px;
  font-size: 48px;
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
}

.button-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 100px);
  gap: 25px;
}
</style>
