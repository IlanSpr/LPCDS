<template>
  <div>
    <h1>Sélectionner un thème</h1>
    <div class="grid">
      <div
        v-for="(theme, index) in themes"
        :key="index"
        :class="{ active: theme.active, inactive: !theme.active }"
        @click="selectTheme(theme, index)"
      >
        <span>{{ theme.name }}</span>
        <img v-if="theme.image" :src="theme.image" alt="theme image" />
      </div>
    </div>
    <button @click="goBack">Retour</button>
  </div>
</template>

<script>
export default {
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
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
}
.active {
  background-color: lightgreen;
  cursor: pointer;
}
.inactive {
  background-color: lightgray;
  cursor: not-allowed;
}
</style>
