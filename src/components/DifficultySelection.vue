<template>
  <div>
    <button @click="$router.go(-1)" class="back-arrow">←</button>
    <h3>Catégorie : {{ selectedBox.label }}</h3>
    <p>Choisir la difficulté :</p>
    <button @click="selectDifficulty('Facile')">Facile (1 point)</button>
    <button @click="selectDifficulty('Difficile')">Difficile (2 points)</button>
    <button v-if="selectedBox.mystery" @click="selectDifficulty('Mystère')">
      Mystère (3 points)
    </button>
  </div>
</template>

<script>
export default {
  props: ['box'],
  methods: {
    selectDifficulty(difficulty) {
      this.$router.push({
        name: 'QuestionDisplay',
        params: { box: this.box, difficulty }
      })
    }
  }
}
</script>

<style scoped>
.back-arrow {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
}
button {
  margin: 10px;
  padding: 15px;
  font-size: 18px;
}
</style>
