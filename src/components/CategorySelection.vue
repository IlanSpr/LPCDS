<template>
  <div class="category-selection">
    <h1>Choisis une catégorie</h1>
    <div class="categories">
      <div
        v-for="(category, index) in categories"
        :key="index"
        :class="['category-box', { selected: category.selected }]"
        @click="selectCategory(index)"
      >
        {{ category.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [
        { name: 'Cinéma', selected: false },
        { name: 'Musique', selected: false },
        { name: 'Jeux-vidéo', selected: false }
        // Tu peux ajouter plus de catégories ici
      ]
    }
  },
  methods: {
    selectCategory(index) {
      if (!this.categories[index].selected) {
        this.$emit('categorySelected', this.categories[index])
        this.categories[index].selected = true
      }
    }
  }
}
</script>

<style scoped>
.category-selection {
  text-align: center;
}

.categories {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.category-box {
  padding: 20px;
  margin: 10px;
  border: 2px solid #333;
  background-color: #f0f0f0;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.category-box:hover {
  background-color: #dcdcdc;
}

.category-box.selected {
  background-color: #999;
  cursor: not-allowed;
}
</style>
