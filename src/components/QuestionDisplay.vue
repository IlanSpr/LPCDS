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
  justify-content: center; /* Center items vertically */
  background-color: #add8e6; /* Light blue background */
}

.return-button {
  position: absolute; /* Absolute positioning */
  top: 20px; /* Position from the top */
  left: 20px; /* Position from the left */
  font-size: 2em; /* Font size */
  background: none; /* No background */
  border: none; /* No border */
  color: white; /* White text */
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.7); /* Text shadow */
}

.theme-box {
  text-align: center;
  font-size: 24px; /* Increased font size */
  color: white; /* White text */
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.7); /* Text shadow */
  margin-bottom: 20px; /* Space below the theme */
}

.timer {
  font-size: 48px; /* Timer font size */
  color: white; /* White text */
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.7); /* Text shadow */
  margin: 20px 0; /* Space around the timer */
}

.question-box {
  font-size: 24px; /* Increased font size */
  color: white; /* White text */
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.7); /* Text shadow */
}
</style>
