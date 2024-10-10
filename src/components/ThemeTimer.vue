<template>
  <div class="theme-timer">
    <button class="return-button" v-if="timer === 0" @click="returnToPhaseTwo">←</button>
    <h1>{{ categoryName }}</h1>
    <div class="timer" @click="startTimer" :class="{ expired: timer === 0 }">
      <h2>{{ formattedTime }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categoryName: this.$route.params.categoryName,
      timer: 0,
      interval: null
    }
  },
  computed: {
    formattedTime() {
      return this.timer < 10 ? `0${this.timer}` : this.timer
    }
  },
  mounted() {
    this.timer = parseInt(localStorage.getItem('phase2Timer')) || 90 // Set default value for phase2Timer
  },
  methods: {
    startTimer() {
      if (this.interval) return // Prevent multiple intervals
      this.interval = setInterval(() => {
        if (this.timer > 0) {
          this.timer--
        } else {
          clearInterval(this.interval)
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
    clearInterval(this.interval)
  }
}
</script>

<style scoped>
.theme-timer {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  position: relative; /* Set position relative for the button */
}

.return-button {
  position: absolute; /* Position the button in the top-left corner */
  top: 10px;
  left: 10px;
  padding: 10px 20px;
  font-size: 2rem;
  background-color: transparent; /* Make button transparent */
  color: white; /* White text color */
  border: none;
  cursor: pointer;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Shadow effect */
}

h1,
h2 {
  color: white; /* Text color */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Text shadow */
}

.timer {
  background-color: transparent; /* Make the timer transparent */
  border: none; /* Remove border */
  padding: 20px;
  font-size: 2rem;
  cursor: pointer;
  margin: 20px 0;
  transition: cursor 0.3s; /* Change cursor on hover */
}

.timer:hover {
  cursor: pointer; /* Change cursor on hover */
}

.timer h2 {
  color: white; /* Timer text color */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Text shadow for effect */
}
</style>
