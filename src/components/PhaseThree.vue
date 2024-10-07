<template>
  <div>
    <button @click="$router.go(-1)" class="back-arrow">←</button>
    <h2>Phase 3 : Grille et Questions</h2>

    <!-- Grille des thèmes -->
    <div class="grid">
      <button
        v-for="(theme, index) in themes"
        :key="index"
        :class="{ selected: theme.selected }"
        @click="selectTheme(theme)"
        :disabled="theme.selected"
      >
        {{ theme.name }}
      </button>
    </div>

    <!-- Choix de la difficulté -->
    <div v-if="themeSelected">
      <h3>Thème : {{ selectedTheme.name }}</h3>
      <img :src="selectedTheme.isMystery ? '/path/to/question-mark.png' : selectedTheme.image" />
      <p>Choisissez la difficulté :</p>
      <button @click="selectDifficulty('Facile', 1)">Facile (1 point)</button>
      <button @click="selectDifficulty('Difficile', 2)">Difficile (2 points)</button>
      <button v-if="selectedTheme.isMystery" @click="selectDifficulty('Mystère', 3)">
        Mystère (3 points)
      </button>
    </div>

    <!-- Affichage de la question avec le timer -->
    <div v-if="difficultySelected">
      <h3>Thème : {{ selectedTheme.name }}</h3>
      <p>Question : {{ question }}</p>
      <p>Points : {{ points }}</p>
      <p>Timer : {{ timer }} secondes</p>
      <button @click="startTimer">Lancer le Timer</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      themes: [], // Initialiser le tableau des thèmes
      selectedTheme: null,
      question: null,
      points: 0,
      timer: 0,
      themeSelected: false,
      difficultySelected: false
    }
  },
  methods: {
    selectTheme(theme) {
      this.selectedTheme = theme
      this.themeSelected = true
    },
    selectDifficulty(difficulty, points) {
      this.points = points
      this.question =
        difficulty === 'Facile' ? this.selectedTheme.easyQuestion : this.selectedTheme.hardQuestion
      this.timer = this.selectedTheme.timer
      this.difficultySelected = true
    },
    startTimer() {
      // Logique pour lancer le timer
      console.log('Le timer démarre pour ' + this.timer + ' secondes.')
    }
  },
  mounted() {
    // Charger les thèmes depuis localStorage (phase3Themes)
    this.themes = JSON.parse(localStorage.getItem('phase3Themes')) || [
      {
        name: 'Histoire',
        easyQuestion: 'Quelle est la capitale de la France ?',
        hardQuestion: 'En quelle année a eu lieu la Révolution française ?',
        isMystery: false,
        image: '/path/to/history-image.png',
        timer: 30
      },
      {
        name: 'Cinéma',
        easyQuestion: 'Qui a réalisé "Inception" ?',
        hardQuestion: 'En quelle année est sorti le premier Star Wars ?',
        isMystery: false,
        image: '/path/to/cinema-image.png',
        timer: 30
      },
      {
        name: 'Mystère',
        easyQuestion: '',
        hardQuestion: 'Quel est le plus grand mystère de l’univers ?',
        isMystery: true,
        image: '', // Par défaut, il affichera l'image du point d'interrogation
        timer: 40
      }
    ]
  }
}
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 20px 0;
}

button {
  padding: 20px;
  font-size: 16px;
}

img {
  max-width: 200px;
  margin: 10px 0;
}

.selected {
  background-color: grey;
  color: white;
}

.back-arrow {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
}
</style>
