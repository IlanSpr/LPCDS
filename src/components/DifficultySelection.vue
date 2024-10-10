<template>
  <div class="difficulty-selection">
    <router-link to="/home" class="back-button">←</router-link>
    <div class="difficulty-container">
      <BaseButton @click="selectDifficulty('facile')" text="Question facile" />
      <BaseButton @click="selectDifficulty('difficile')" text="Question difficile" />
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue'

export default {
  components: {
    BaseButton
  },
  methods: {
    selectDifficulty(difficulty) {
      localStorage.setItem('phase3Difficulty', difficulty)
      this.$router.push({ name: 'QuestionDisplay' })
    },
    goBack() {
      this.$router.push({ name: 'PhaseThree' })
    }
  }
}
</script>

<style scoped>
.difficulty-selection {
  padding: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh; /* Fixer la hauteur pour éviter le scroll */
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

.difficulty-container {
  display: flex; /* Afficher les boutons en ligne */
  justify-content: space-around; /* Espacement entre les boutons */
  width: 100%; /* Prendre toute la largeur */
  margin-top: 50px; /* Marge au-dessus des boutons */
}

.base-button {
  width: 150px; /* Largeur fixe pour les boutons */
  height: 150px; /* Hauteur fixe pour les boutons */
  font-size: 24px; /* Taille de texte agrandie */
  text-align: center; /* Centrer le texte */
  display: flex; /* Centrer le contenu verticalement */
  justify-content: center; /* Centrer horizontalement */
  align-items: center; /* Centrer verticalement */
}
</style>
