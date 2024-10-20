<template>
  <div class="phase-two">
    <router-link to="/home" class="back-button"> ← </router-link>

    <div class="category-list">
      <BaseButton
        v-for="(category, index) in phase2Themes"
        :key="index"
        :text="category.name"
        :class="{ inactive: !category.active }"
        @click="category.active && selectCategory(category.name, index)"
      />
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue'

export default {
  components: {
    BaseButton
  },
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
  padding: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.back-button {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 10px 20px;
  font-size: 2rem;
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  transition: background-color 0.3s;
  text-decoration: none;
}

.category-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 50px;
  width: 100%;
  max-width: 600px;
}

.base-button {
  width: 150px;
  height: 150px;
  font-size: 24px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.inactive {
  opacity: 0.3;
  color: grey;
  cursor: not-allowed;
}
</style>
