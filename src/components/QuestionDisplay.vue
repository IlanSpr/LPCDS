<template>
  <div class="question-display">
    <button v-if="timer === 0" class="return-button" @click="handleTimerEnd">←</button>

    <div class="theme-box">
      <span>{{ theme.name }}</span>
    </div>

    <div class="timer">{{ timer }}</div>

    <div class="question-box">
      <span>{{ question }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      theme: JSON.parse(localStorage.getItem('phase3SelectedTheme')) || {},
      difficulty: localStorage.getItem('phase3Difficulty'),
      question: '',
      timer: localStorage.getItem('phase3Timer') || 10
    }
  },
  mounted() {
    this.startTimer()
    this.loadQuestion()
  },
  methods: {
    startTimer() {
      const interval = setInterval(() => {
        if (this.timer > 0) {
          this.timer--
        } else {
          clearInterval(interval)
        }
      }, 1000)
    },
    loadQuestion() {
      const index = localStorage.getItem('phase3SelectedThemeIndex')
      const phase3Themes = JSON.parse(localStorage.getItem('phase3Themes'))

      if (phase3Themes && index !== null) {
        const selectedTheme = phase3Themes[index]

        if (selectedTheme) {
          if (this.difficulty === 'facile') {
            this.question = selectedTheme.easyQuestion
          } else if (this.difficulty === 'difficile') {
            this.question = selectedTheme.hardQuestion
          }
        }
      }
    },
    handleTimerEnd() {
      const index = localStorage.getItem('phase3SelectedThemeIndex')
      const phase3Themes = JSON.parse(localStorage.getItem('phase3Themes'))

      if (phase3Themes && index !== null) {
        phase3Themes[index].active = false
        localStorage.setItem('phase3Themes', JSON.stringify(phase3Themes))
      }

      localStorage.removeItem('phase3SelectedTheme')
      localStorage.removeItem('phase3SelectedThemeIndex')
      localStorage.removeItem('phase3Difficulty')

      this.$router.push({ name: 'PhaseThree' })
    }
  }
}
</script>

<style scoped>
.question-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between; /* Distributes items evenly */
  height: 100vh; /* Full viewport height */
  max-width: 800px; /* Center column with max width of 800px */
  margin: 0 auto; /* Center horizontally */
  background-color: #add8e6;
  padding: 20px; /* Add padding */
}

.return-button {
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 2em;
  background: none;
  cursor: pointer;
  border: none;
  color: white;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.7);
}

.theme-box {
  text-align: center;
  font-size: 42px; /* Larger font size for the theme */
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.7);
  margin-top: 20px; /* Add space from top */
}

.timer {
  font-size: 72px; /* Large timer */
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.7);
  margin: 0 auto; /* Centered */
}

.question-box {
  font-size: 32px; /* Larger question font */
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.7);
  margin-bottom: 80px; /* Margin at the bottom */
}
</style>
