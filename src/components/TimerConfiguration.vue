<template>
  <div class="timer">
    <h1>{{ category.name }}</h1>
    <p>Temps restant : {{ timeLeft }}s</p>
    <button @click="startTimer" :disabled="timerRunning">Démarrer le timer</button>
    <button @click="resetTimer">Réinitialiser</button>
    <div v-if="timeLeft === 0">
      <button @click="returnToCategories">Retour aux catégories</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    category: Object,
    initialTime: Number
  },
  data() {
    return {
      timeLeft: this.initialTime,
      timerRunning: false
    }
  },
  methods: {
    startTimer() {
      if (this.timeLeft > 0) {
        this.timerRunning = true
        this.timer = setInterval(() => {
          this.timeLeft--
          if (this.timeLeft === 0) {
            clearInterval(this.timer)
            this.timerRunning = false
          }
        }, 1000)
      }
    },
    resetTimer() {
      clearInterval(this.timer)
      this.timeLeft = this.initialTime
      this.timerRunning = false
    },
    returnToCategories() {
      this.$emit('returnToCategories')
    }
  },
  beforeUnmount() {
    clearInterval(this.timer)
  }
}
</script>

<style scoped>
.timer {
  text-align: center;
  margin-top: 20px;
}

button {
  margin: 10px;
}
</style>
