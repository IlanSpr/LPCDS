<template>
  <div class="question-display">
    <h3>Catégorie : {{ selectedBox.label }}</h3>
    <h2>Question ({{ selectedDifficulty }})</h2>
    <div class="question">
      {{ selectedBox.questions[selectedDifficulty] }}
    </div>
    <div class="timer">
      <span>{{ countdown }}</span>
    </div>
    <div v-if="countdown === 0">
      <button @click="goBack">Retour à la grille</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['box', 'difficulty'],
  data() {
    return {
      countdown: this.getTimerValue()
    }
  },
  computed: {
    selectedBox() {
      return this.box
    },
    selectedDifficulty() {
      return this.difficulty
    }
  },
  methods: {
    getTimerValue() {
      return localStorage.getItem('timerValue') || 90
    },
    goBack() {
      this.selectedBox.selected = true // Griser la case
      this.$router.push({ name: 'GridSelection' })
    }
  },
  mounted() {
    this.startTimer()
  },
  startTimer() {
    const timerInterval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--
      } else {
        clearInterval(timerInterval)
      }
    }, 1000)
  }
}
</script>

<style scoped>
.question-display {
  text-align: center;
  background-color: #00ff00; /* Fond vert */
  padding: 20px;
}
.timer {
  font-size: 48px;
  margin: 20px 0;
}
button {
  padding: 10px;
  font-size: 18px;
}
</style>
