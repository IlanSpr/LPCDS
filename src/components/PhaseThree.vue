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
  height: 40vh; /* Fixer la hauteur pour éviter le scroll */
  overflow: hidden; /* Éviter le défilement */
}

.back-button {
  position: absolute; /* Positionner le bouton en haut à gauche */
  top: 10px;
  left: 10px;
  padding: 10px 20px;
  font-size: 2rem;
  background-color: transparent; /* Fond transparent */
  color: white; /* Couleur du texte */
  border: none;
  cursor: pointer;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Ombre du texte */
  transition: background-color 0.3s;
  text-decoration: none; /* Retirer le soulignement */
}

.category-list {
  display: grid; /* Utiliser la grille pour les thèmes */
  grid-template-columns: repeat(4, 1fr); /* 4 colonnes maximum */
  gap: 20px; /* Espace entre les thèmes */
  margin-top: 50px; /* Espace au-dessus de la liste */
  width: 100%; /* Largeur complète */
  max-width: 800px; /* Largeur max */
}

.base-button {
  width: 150px; /* Largeur fixe pour les boutons */
  height: 150px; /* Hauteur fixe pour les boutons */
  font-size: 24px; /* Agrandir la taille du texte */
  text-align: center; /* Centrer le texte */
  display: flex; /* Centrer le contenu verticalement */
  justify-content: center; /* Centrer horizontalement */
  align-items: center; /* Centrer verticalement */
}

.inactive {
  opacity: 0.3; /* Transparence pour les inactifs */
  color: grey; /* Couleur grisée */
  cursor: not-allowed; /* Curseur non autorisé */
}
</style>
