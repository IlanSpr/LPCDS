<template>
  <div class="phase-two">
    <router-link to="/home" class="back-button">
      <i class="fas fa-arrow-left"></i> Retour
    </router-link>

    <h1>Phase 2</h1>
    <h3>Catégories :</h3>
    <div class="category-list">
      <div
        v-for="(category, index) in phase2Themes"
        :key="index"
        class="category-card"
        @click="category.active && selectCategory(category.name, index)"
        :class="{ active: category.active, inactive: !category.active }"
      >
        {{ category.name }} - État : {{ category.active ? 'Actif' : 'Inactif' }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phase2Themes: JSON.parse(localStorage.getItem('phase2Themes')) || []
    }
  },
  methods: {
    selectCategory(categoryName, index) {
      if (this.phase2Themes[index].active) {
        this.$router.push({ name: 'ThemeTimer', params: { categoryName } })
      }
    }
  }
}
</script>

<style scoped>
.phase-two {
  padding: 20px;
}

.category-list {
  display: flex;
  flex-direction: column;
}

.category-card {
  padding: 15px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.category-card.active {
  background-color: #e0ffe0; /* Light green for active categories */
}

.category-card.inactive {
  background-color: #f0f0f0;
  cursor: not-allowed;
  color: #999;
}

.category-card:hover {
  background-color: #f0f0f0;
}

.back-button {
  display: inline-block;
  margin-bottom: 20px;
  font-weight: bold;
}
</style>
