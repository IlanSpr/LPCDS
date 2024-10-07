<template>
  <div>
    <button @click="$router.go(-1)" class="back-arrow">←</button>
    <h2>Phase 3 : Grille et Questions</h2>
    <div class="grid">
      <button
        v-for="(box, index) in grid"
        :key="index"
        :class="{ selected: box.selected }"
        @click="selectBox(box)"
        :disabled="box.selected"
      >
        {{ box.label }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      grid: JSON.parse(localStorage.getItem('phase3Questions')) || [],
      selectedBox: null
    }
  },
  methods: {
    selectBox(box) {
      this.selectedBox = box
      this.$router.push({ name: 'DifficultySelection', params: { box: this.selectedBox } })
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
.selected {
  background-color: grey;
  color: white;
}
</style>
