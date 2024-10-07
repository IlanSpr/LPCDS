<template>
  <div>
    <button @click="$router.go(-1)" class="back-arrow">←</button>
    <h2>Phase 2 : Choix de catégories</h2>
    <div class="categories">
      <button
        v-for="(category, index) in categories"
        :key="index"
        @click="selectCategory(category)"
        :disabled="selectedCategories.includes(category)"
      >
        {{ category }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: JSON.parse(localStorage.getItem('categories')) || [],
      selectedCategories: JSON.parse(localStorage.getItem('selectedCategories')) || [] // Pour griser les catégories choisies
    }
  },
  methods: {
    selectCategory(category) {
      this.selectedCategories.push(category) // Marque la catégorie comme choisie
      localStorage.setItem('selectedCategories', JSON.stringify(this.selectedCategories))

      // Redirection vers la page du timer avec le nom de la catégorie en paramètre
      this.$router.push({ name: 'ThemeTimer', params: { category } })
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
.categories {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
button {
  margin: 10px;
  padding: 15px;
  font-size: 18px;
}
button:disabled {
  background-color: gray;
  cursor: not-allowed;
}
</style>
