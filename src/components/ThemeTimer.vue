<template>
  <div class="theme-timer">
    <button class="return-button" v-if="timer === 0" @click="returnToPhaseTwo">←</button>
    <h1 class="category-title">{{ categoryName }}</h1>
    <div class="timer" @click="startTimer">
      <h2>{{ formattedTime }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categoryName: this.$route.params.categoryName, // Nom de la catégorie depuis les paramètres de la route
      timer: 0, // Timer initialisé à 0
      interval: null // Stockage de l'interval pour arrêter le timer
    }
  },
  computed: {
    // Formatage du temps pour afficher "0X" si le timer est inférieur à 10
    formattedTime() {
      return this.timer < 10 ? `0${this.timer}` : this.timer
    }
  },
  mounted() {
    // Timer par défaut à 90 secondes ou récupéré du localStorage
    this.timer = parseInt(localStorage.getItem('phase2Timer')) || 90
  },
  methods: {
    startTimer() {
      if (this.interval) return // Empêcher de démarrer plusieurs intervalles
      this.interval = setInterval(() => {
        if (this.timer > 0) {
          this.timer--
        } else {
          clearInterval(this.interval) // Arrêter le timer à 0
          this.interval = null
        }
      }, 1000)
    },
    returnToPhaseTwo() {
      const phase2Themes = JSON.parse(localStorage.getItem('phase2Themes')) || []
      const index = phase2Themes.findIndex((category) => category.name === this.categoryName)

      if (index !== -1) {
        phase2Themes[index].active = false
        localStorage.setItem('phase2Themes', JSON.stringify(phase2Themes))
      }

      this.$router.push('/phase-two')
    }
  },
  beforeUnmount() {
    clearInterval(this.interval) // Nettoyage de l'interval lors de la destruction du composant
  }
}
</script>

<style scoped>
/* Container principal avec positionnement relatif pour organiser les éléments */
.theme-timer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
  position: relative;
}

.return-button {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 2rem;
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.category-title {
  position: absolute;
  top: 20px;
  font-size: 2rem;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.timer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 800px;
  font-size: 3rem;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  cursor: pointer;
}

.timer h2 {
  margin: 0;
}
</style>
