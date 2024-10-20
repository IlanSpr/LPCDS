<template>
  <div class="phase-three">
    <router-link to="/home" class="back-button">←</router-link>
    <div class="category-list">
      <BaseButton
        v-for="(theme, index) in themes"
        :key="index"
        :text="theme.name"
        :class="{ inactive: !theme.active }"
        @click="selectTheme(theme, index)"
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
      themes: [] // Initialiser les thèmes
    }
  },
  mounted() {
    this.loadThemes() // Charger les thèmes lors du montage du composant
  },
  methods: {
    loadThemes() {
      // Charger les thèmes à partir de localStorage
      const savedThemes = localStorage.getItem('phase3Themes')
      if (savedThemes) {
        this.themes = JSON.parse(savedThemes)
      }
    },
    selectTheme(theme, index) {
      if (theme.active) {
        // Enregistrer le thème et l'index dans localStorage
        localStorage.setItem('phase3SelectedTheme', JSON.stringify(theme))
        localStorage.setItem('phase3SelectedThemeIndex', index)
        this.$router.push({ name: 'DifficultySelection' })
      }
    },
    goBack() {
      this.$router.push({ name: 'HomePage' })
    }
  }
}
</script>

<style scoped>
.phase-three {
  padding: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 40vh;
  overflow: hidden;
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
  transition: background-color 0.3s;
  text-decoration: none;
}

.category-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 50px;
  width: 100%;
  max-width: 800px;
}

.base-button {
  width: 150px;
  height: 150px;
  font-size: 24px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.inactive {
  opacity: 0.3;
  color: grey;
  cursor: not-allowed;
}
</style>
