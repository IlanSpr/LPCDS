<template>
  <div class="theme-timer">
    <button @click="$router.go(-1)" class="back-arrow">←</button>
    <h2>{{ selectedCategory }}</h2>

    <div v-if="!timerStarted">
      <button @click="startTimer" class="start-timer-btn">Lancer le Timer</button>
    </div>

    <div v-if="timerStarted">
      <p>{{ currentTimer }}s</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedCategory: this.$route.params.category,
      timerValue: localStorage.getItem('timerValue') || 90,
      currentTimer: localStorage.getItem('timerValue') || 90,
      timerStarted: false,
      timerFinished: false,
      intervalId: null
    }
  },
  methods: {
    startTimer() {
      this.timerStarted = true
      this.intervalId = setInterval(() => {
        if (this.currentTimer > 0) {
          this.currentTimer--
        } else {
          this.timerFinished = true
          clearInterval(this.intervalId)
        }
      }, 1000)
    }
  },
  beforeUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  }
}
</script>

<style scoped>
.back-arrow {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
}
.theme-timer {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.start-timer-btn,
.back-to-categories-btn {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 18px;
}
</style>
