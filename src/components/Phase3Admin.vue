<template>
  <div class="phase3-admin">
    <h2>Phase 3</h2>

    <h3>Éléments existants :</h3>
    <div class="theme-grid">
      <ThemeCard
        v-for="(theme, index) in phase3Themes"
        :key="index"
        :theme="theme"
        :index="index"
        @activate="forceThemeActive"
        @edit="showEditThemePopupPhase3(index)"
        @delete="deleteTheme"
      />
      <div class="theme-card add-theme-card" @click="showAddThemePopup = true">
        <div class="theme-info">
          <span class="theme-name">Ajouter un élément</span>
        </div>
      </div>
    </div>

    <div class="button-container">
      <button class="clear-all-btn" @click="confirmClearAllPhase3">Tout supprimer</button>
    </div>

    <div class="form-group timer-group">
      <label class="timer-label">Timer Phase 3 :</label>
      <input v-model.number="phase3Timer" type="number" placeholder="10" />
      <button @click="saveTimerValue('phase3Timer', phase3Timer)">Enregistrer</button>
      <span v-if="timerMessage" class="timer-message">{{ timerMessage }}</span>
    </div>

    <ThemeForm
      v-if="showAddThemePopup"
      @close="showAddThemePopup = false"
      @submit="addTheme"
      :close="() => (showAddThemePopup = false)"
    />

    <ThemeForm
      v-if="showEditThemePopup"
      :theme="editTheme"
      isEdit
      @close="showEditThemePopup = false"
      @submit="updateTheme"
      :close="() => (showEditThemePopup = false)"
    />

    <modal v-if="showConfirmClearPhase3" :close="() => (showConfirmClearPhase3 = false)">
      <template #header>
        <h1>Confirmation</h1>
      </template>
      <template #body>
        <p>Supprimer tous les élélments de la phase 3 ?</p>
      </template>
      <template #footer>
        <button @click="clearAllPhase3">Confirmer</button>
        <button @click="showConfirmClearPhase3 = false">Annuler</button>
      </template>
    </modal>
  </div>
</template>

<script>
import ThemeCard from './ThemeCard.vue'
import ThemeForm from './ThemeForm.vue'
import Modal from './ModalComp.vue'

export default {
  components: { ThemeCard, ThemeForm, Modal },
  data() {
    return {
      phase3Themes: JSON.parse(localStorage.getItem('phase3Themes')) || [],
      phase3Timer: parseInt(localStorage.getItem('phase3Timer')) || 10,
      showAddThemePopup: false,
      showEditThemePopup: false,
      editThemeIndex: null,
      editTheme: {},
      showConfirmClearPhase3: false,
      timerMessage: ''
    }
  },
  methods: {
    addTheme(newTheme) {
      if (newTheme.name.trim()) {
        this.phase3Themes.push({
          name: newTheme.name,
          active: true,
          easyQuestion: newTheme.easyQuestion,
          hardQuestion: newTheme.hardQuestion
        })
        localStorage.setItem('phase3Themes', JSON.stringify(this.phase3Themes))
        this.showAddThemePopup = false
      }
    },
    forceThemeActive(index) {
      this.phase3Themes[index].active = true
      localStorage.setItem('phase3Themes', JSON.stringify(this.phase3Themes))
    },
    deleteTheme(index) {
      this.phase3Themes.splice(index, 1)
      localStorage.setItem('phase3Themes', JSON.stringify(this.phase3Themes))
    },
    clearAllPhase3() {
      this.phase3Themes = []
      localStorage.removeItem('phase3Themes')
      this.showConfirmClearPhase3 = false
    },
    confirmClearAllPhase3() {
      this.showConfirmClearPhase3 = true
    },
    showEditThemePopupPhase3(index) {
      this.editThemeIndex = index
      this.editTheme = { ...this.phase3Themes[index] }
      this.showEditThemePopup = true
    },
    updateTheme(updatedTheme) {
      try {
        if (!updatedTheme || !updatedTheme.name) {
          throw new Error('Invalid theme data')
        }

        this.phase3Themes[this.editThemeIndex] = { ...updatedTheme }
        delete this.phase3Themes[this.editThemeIndex].image
        localStorage.setItem('phase3Themes', JSON.stringify(this.phase3Themes))
        this.showEditThemePopup = false
      } catch (error) {
        console.error('Error updating theme:', error.message)
      }
    },
    saveTimerValue(timerType, value) {
      this[timerType] = value
      localStorage.setItem(timerType, value)
      this.timerMessage = 'Durée du timer enregistrée!'
      setTimeout(() => {
        this.timerMessage = ''
      }, 2000)
    }
  }
}
</script>

<style scoped>
.phase3-admin {
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

.theme-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px 0;
}

.add-theme-card {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
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

.timer-group {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.timer-label {
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.timer-message {
  margin-left: 20px;
  color: lightsalmon;
}

input {
  padding: 3px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 60px;
  margin-left: 10px;
}

.theme-card.add-theme-card {
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
