<template>
  <div class="difficulty-selection">
    <router-link to="/phase-three" class="back-button">←</router-link>
    <div
      class="difficulty-container"
      :class="{ 'single-button': (showEasy && !showHard) || (!showEasy && showHard) }"
    >
      <BaseButton
        v-if="showEasy"
        @click="selectDifficulty('facile')"
        text="Question facile"
        class="difficulty-button"
      />
      <BaseButton
        v-if="showHard"
        @click="selectDifficulty('difficile')"
        text="Question difficile"
        class="difficulty-button"
      />
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue'

export default {
  components: {
    BaseButton
  },
  data() {
    return {
      showEasy: false,
      showHard: false
    }
  },
  mounted() {
    this.checkQuestions()
  },
  methods: {
    checkQuestions() {
      const index = localStorage.getItem('phase3SelectedThemeIndex')
      const phase3Themes = JSON.parse(localStorage.getItem('phase3Themes'))

      if (phase3Themes && index !== null) {
        const selectedTheme = phase3Themes[index]
        this.showEasy = !!selectedTheme.easyQuestion?.trim() // Show if easy question is non-empty
        this.showHard = !!selectedTheme.hardQuestion?.trim() // Show if hard question is non-empty
      }
    },
    selectDifficulty(difficulty) {
      localStorage.setItem('phase3Difficulty', difficulty)
      this.$router.push({ name: 'QuestionDisplay' })
    }
  }
}
</script>

<style scoped>
.difficulty-selection {
  width: 100vw; /* Full viewport width */
  height: 100vh; /* Full viewport height */
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #add8e6; /* Light blue background */
}

.back-button {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 10px 20px;
  font-size: 2rem;
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  text-decoration: none;
}

.difficulty-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px; /* Add space between buttons */
}

.difficulty-button {
  width: 300px;
  height: 150px; /* Increased button height */
  font-size: 2rem; /* Increased font size */
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.2s; /* Smooth hover effect */
}

.difficulty-button:hover {
  transform: scale(1.05); /* Slight scale effect on hover */
}

.single-button {
  justify-content: center; /* If only one button, center it vertically */
}
</style>
