<template>
  <div class="theme-timer">
    <h1>{{ categoryName }}</h1>
    <div class="timer" @click="startTimer">
      <h2>{{ formattedTime }}</h2>
    </div>
    <button v-if="timer === 0" class="return-button" @click="returnToPhaseTwo">Retour</button>
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
}

.timer {
  border: 2px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  font-size: 2rem;
  cursor: pointer;
  margin: 20px 0;
  transition: background-color 0.3s;
}

.timer:hover {
  background-color: #f0f0f0;
}

.return-button {
  padding: 10px 20px;
  font-size: 1.2rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.return-button:hover {
  background-color: #0056b3;
}
</style>
