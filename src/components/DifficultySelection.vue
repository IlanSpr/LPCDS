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
        // Show only if the question is non-empty
        this.showEasy = !!selectedTheme.easyQuestion?.trim()
        this.showHard = !!selectedTheme.hardQuestion?.trim()
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
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #add8e6;
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
  gap: 30px;
}

.difficulty-button {
  width: 300px;
  height: 150px;
  font-size: 2rem;
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.2s;
}

.difficulty-button:hover {
  transform: scale(1.05);
}

.single-button {
  justify-content: center;
}
</style>
