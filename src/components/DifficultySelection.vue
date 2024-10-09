<template>
  <div>
    <h1>Choisir la difficulté</h1>
    <div class="difficulty-container">
      <div class="box" @click="selectDifficulty('facile')">Question facile</div>
      <div class="box" @click="selectDifficulty('difficile')">Question difficile</div>
    </div>
    <button @click="goBack">Retour</button>
  </div>
</template>

<script>
export default {
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
.difficulty-container {
  display: flex;
  justify-content: center;
}
.box {
  margin: 20px;
  padding: 20px;
  background-color: lightblue;
  cursor: pointer;
}
</style>
