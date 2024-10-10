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
  position: relative; /* Added to position the back button */
}

.back-button {
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
  transition: background-color 0.3s;
  text-decoration: none; /* Remove underline */
}

.category-list {
  display: grid; /* Use grid for two columns */
  grid-template-columns: repeat(2, 1fr); /* Two columns */
  gap: 20px; /* Space between buttons */
  margin-top: 50px; /* Space from the top */
  width: 100%; /* Full width */
  max-width: 600px; /* Limit the max width */
}

.base-button {
  width: 150px; /* Fixed width for square buttons */
  height: 150px; /* Fixed height for square buttons */
  font-size: 24px; /* Font size */
  text-align: center; /* Center text */
  display: flex; /* Center content vertically */
  justify-content: center; /* Center content horizontally */
  align-items: center; /* Center content vertically */
}

.inactive {
  opacity: 0.3; /* Transparent */
  color: grey; /* Grayed out */
  cursor: not-allowed; /* Not allowed cursor */
}
</style>
