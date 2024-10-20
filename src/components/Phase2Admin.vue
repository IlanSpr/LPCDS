<template>
  <div class="phase-admin">
    <h2>Phase 2</h2>

    <h3>Catégories existantes :</h3>
    <div class="category-grid">
      <div
        v-for="(category, index) in phase2Themes"
        :key="index"
        class="category-card"
        :class="{ inactive: !category.active }"
      >
        <span class="category-name">{{ category.name }}</span>
        <div class="category-actions">
          <button @click="forceCategoryActive(index)">Activer</button>
          <button @click="deleteCategory(index)">x</button>
        </div>
      </div>

      <div class="category-card add-category-card" @click="showAddCategoryPopup = true">
        <span>Ajouter une catégorie</span>
      </div>
    </div>

    <div class="button-container">
      <button class="clear-all-btn" @click="confirmClearAllPhase2">Tout supprimer</button>
    </div>

    <div class="form-group timer-group">
      <label class="timer-label">Timer Phase 2 : </label>
      <input v-model.number="phase2Timer" type="number" placeholder="90" />
      <button @click="saveTimerValue('phase2Timer', phase2Timer)">Enregistrer</button>
      <span v-if="timerMessage" class="timer-message">{{ timerMessage }}</span>
    </div>

    <modal v-if="showConfirmClearPhase2" :close="() => (showConfirmClearPhase2 = false)">
      <template #header>
        <h1>Confirmation</h1>
      </template>
      <template #body>
        <p>Supprimer tous les élélments de la phase 2 ?</p>
      </template>
      <template #footer>
        <button @click="clearAllPhase2">Confirmer</button>
        <button @click="showConfirmClearPhase2 = false">Annuler</button>
      </template>
    </modal>

    <modal v-if="showAddCategoryPopup" :close="() => (showAddCategoryPopup = false)">
      <template #header>
        <h1>Ajouter une catégorie</h1>
      </template>
      <template #body>
        <div>
          <label>Nom : </label>
          <input v-model="newCategory" placeholder="Nom de la catégorie" class="wide-input" />
        </div>
      </template>
      <template #footer>
        <button @click="addCategory">Ajouter</button>
        <button @click="showAddCategoryPopup = false">Annuler</button>
      </template>
    </modal>
  </div>
</template>

<script>
import Modal from './ModalComp.vue'

export default {
  components: { Modal },
  data() {
    return {
      newCategory: '',
      phase2Themes: JSON.parse(localStorage.getItem('phase2Themes')) || [],
      phase2Timer: parseInt(localStorage.getItem('phase2Timer')) || 90,
      timerMessage: '',
      showAddCategoryPopup: false,
      showConfirmClearPhase2: false
    }
  },
  methods: {
    addCategory() {
      if (this.newCategory.trim()) {
        this.phase2Themes.push({ name: this.newCategory.trim(), active: true })
        localStorage.setItem('phase2Themes', JSON.stringify(this.phase2Themes))
        this.newCategory = ''
        this.showAddCategoryPopup = false
      }
    },
    forceCategoryActive(index) {
      this.phase2Themes[index].active = true
      localStorage.setItem('phase2Themes', JSON.stringify(this.phase2Themes))
    },
    deleteCategory(index) {
      this.phase2Themes.splice(index, 1)
      localStorage.setItem('phase2Themes', JSON.stringify(this.phase2Themes))
    },
    clearAllPhase2() {
      this.phase2Themes = []
      localStorage.removeItem('phase2Themes')
      this.showConfirmClearPhase2 = false // Ferme le modal après avoir vidé la liste
    },
    confirmClearAllPhase2() {
      this.showConfirmClearPhase2 = true
    },
    saveTimerValue(timerType, value) {
      this[timerType] = value
      localStorage.setItem(timerType, value)
      this.timerMessage = 'Durée du timer enregistrée'
      setTimeout(() => (this.timerMessage = ''), 2000)
    }
  }
}
</script>

<style scoped>
.phase-admin {
  padding: 20px;
  background: rgba(227, 242, 253, 0.8);
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

h2,
h3 {
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  text-align: left;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
  margin: 20px 0;
}

.category-card {
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 60px;
  min-width: 120px;
  max-width: 180px;
  text-align: center;
}

.inactive {
  opacity: 0.5;
}

.add-category-card {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: bold;
}

.category-actions {
  display: flex;
  justify-content: space-between;
}

.button-container {
  display: flex;
  justify-content: flex-end;
}

.timer-group {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.timer-label {
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

button {
  background-color: white;
  color: black;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-left: 10px;
}

button:hover {
  background-color: #e0e0e0;
}

input {
  padding: 3px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 60px;
  margin-left: 10px;
}

.wide-input {
  width: 200px;
}

.timer-message {
  margin-left: 20px;
  color: green;
}
</style>
