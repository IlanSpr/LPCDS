<template>
  <div class="question-display">
    <button v-if="timer === 0" class="return-button" @click="handleTimerEnd">Retour</button>
    <div class="middle-container">
      <div class="green-background"></div>
      <div class="theme-box">
        <span>{{ theme.name }}</span>
      </div>
    </div>
    <div class="bottom-container">
      <div class="question-box">
        <span>{{ question }}</span>
      </div>
      <div class="timer">{{ timer }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      theme: JSON.parse(localStorage.getItem('phase3SelectedTheme')) || {},
      difficulty: localStorage.getItem('phase3Difficulty'),
      question: '', // Initially empty
      timer: 10 // Example timer value; adjust as needed
    }
  },
  mounted() {
    this.startTimer()
    this.loadQuestion() // Load the question based on the selected theme and difficulty
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

        // Ensure the selected theme is valid
        if (selectedTheme) {
          // Select the question based on difficulty
          if (this.difficulty === 'facile') {
            this.question = selectedTheme.easyQuestion // Use easyQuestion property
          } else if (this.difficulty === 'difficile') {
            this.question = selectedTheme.hardQuestion // Use hardQuestion property
          }
        }
      }
    },
    handleTimerEnd() {
      // Get the selected theme index
      const index = localStorage.getItem('phase3SelectedThemeIndex')
      const phase3Themes = JSON.parse(localStorage.getItem('phase3Themes'))

      // Set the theme to inactive
      if (phase3Themes && index !== null) {
        phase3Themes[index].active = false
        localStorage.setItem('phase3Themes', JSON.stringify(phase3Themes))
      }

      // Clear the phase 3 JSON data
      localStorage.removeItem('phase3SelectedTheme')
      localStorage.removeItem('phase3SelectedThemeIndex')
      localStorage.removeItem('phase3Difficulty')

      // Redirect to phase three
      this.$router.push({ name: 'PhaseThree' })
    }
  }
}
</script>

<style scoped>
.question-display {
  display: flex;
  flex-direction: column;
  align-items: center; /* Center align items */
  height: 100vh; /* Full height */
  justify-content: space-between; /* Space items vertically */
}

.return-button {
  margin-top: 20px; /* Space from the top */
}

.middle-container {
  display: flex;
  align-items: center; /* Center align vertically */
}

.green-background {
  width: 150px; /* Set width for the green background */
  height: 150px; /* Set height for the green background */
  background-color: green; /* Set green background */
  margin-right: 20px; /* Space from the theme box */
}

.theme-box {
  text-align: center;
  font-size: 20px;
}

.bottom-container {
  text-align: center;
  margin-bottom: 20px; /* Space from the bottom */
}

.question-box {
  font-size: 24px;
  margin-bottom: 10px; /* Space between question and timer */
}

.timer {
  font-size: 48px;
}
</style>
