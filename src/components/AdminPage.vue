<template>
  <div class="admin-page">
    <h1>Administration - Gestion des Phases</h1>

    <!-- Section Phase 2 -->
    <section class="phase-section">
      <h2>Phase 2 : Gestion des Catégories</h2>

      <div class="form-group">
        <label for="newCategory">Ajouter une nouvelle catégorie :</label>
        <input v-model="newCategory" placeholder="Nom de la catégorie" />
        <button @click="addCategory">Ajouter</button>
      </div>

      <div class="form-group">
        <label for="timerValue">Durée du Timer (en secondes) :</label>
        <input v-model.number="timerValue" type="number" placeholder="90" />
        <button @click="saveTimerValue">Enregistrer Timer</button>
      </div>

      <h3>Catégories existantes :</h3>
      <ul>
        <li v-for="(category, index) in categories" :key="index">
          {{ category }}
          <button @click="deleteCategory(index)">Supprimer</button>
        </li>
      </ul>

      <div class="admin-actions">
        <button @click="resetCategories">Réinitialiser les Catégories</button>
        <button @click="clearAllPhase2">
          Supprimer toutes les catégories et réinitialiser le Timer
        </button>
      </div>
    </section>

    <!-- Section Phase 3 -->
    <section class="phase-section">
      <h2>Phase 3 : Gestion des Thèmes et Questions</h2>

      <div class="form-group">
        <label for="themeName">Nom du Thème :</label>
        <input v-model="newTheme.name" placeholder="Nom du thème" />

        <label for="imageUrl">Image du Thème :</label>
        <input v-model="newTheme.image" placeholder="URL de l'image du thème" />

        <label for="easyQuestion">Question Facile :</label>
        <input v-model="newTheme.easyQuestion" placeholder="Question facile" />

        <label for="hardQuestion">Question Difficile :</label>
        <input v-model="newTheme.hardQuestion" placeholder="Question difficile" />

        <label> <input type="checkbox" v-model="newTheme.isMystery" /> Question Mystère ? </label>

        <label for="timerValue">Durée du Timer (en secondes) :</label>
        <input v-model.number="newTheme.timer" type="number" placeholder="10" />

        <button @click="addTheme">Ajouter Thème</button>
      </div>

      <h3>Thèmes existants :</h3>
      <ul>
        <li v-for="(theme, index) in themes" :key="index">
          {{ theme.name }} - Mystère : {{ theme.isMystery ? 'Oui' : 'Non' }}
          <button @click="deleteTheme(index)">Supprimer</button>
        </li>
      </ul>

      <div class="admin-actions">
        <button @click="resetQuestions">Réinitialiser les Questions</button>
        <button @click="clearAllPhase3">Supprimer tous les Thèmes et Réinitialiser</button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Phase 2 data
      newCategory: '',
      categories: JSON.parse(localStorage.getItem('categories')) || [],
      timerValue: localStorage.getItem('timerValue') || 90,

      // Phase 3 data
      newTheme: {
        name: '',
        image: '',
        easyQuestion: '',
        hardQuestion: '',
        isMystery: false,
        timer: 10
      },
      themes: JSON.parse(localStorage.getItem('phase3Themes')) || []
    }
  },
  methods: {
    // Phase 2 methods
    addCategory() {
      if (this.newCategory.trim()) {
        this.categories.push(this.newCategory.trim())
        localStorage.setItem('categories', JSON.stringify(this.categories))
        this.newCategory = ''
      }
    },
    deleteCategory(index) {
      this.categories.splice(index, 1)
      localStorage.setItem('categories', JSON.stringify(this.categories))
    },
    saveTimerValue() {
      localStorage.setItem('timerValue', this.timerValue)
      alert('Valeur du timer enregistrée !')
    },
    resetCategories() {
      localStorage.removeItem('categories')
      this.categories = []
      alert('Les catégories ont été réinitialisées.')
    },
    clearAllPhase2() {
      localStorage.removeItem('categories')
      localStorage.setItem('timerValue', 90)
      this.categories = []
      this.timerValue = 90
      alert('Toutes les catégories ont été supprimées et le timer a été réinitialisé.')
    },

    // Phase 3 methods
    addTheme() {
      if (this.newTheme.name && this.newTheme.easyQuestion && this.newTheme.hardQuestion) {
        this.themes.push({ ...this.newTheme })
        localStorage.setItem('phase3Themes', JSON.stringify(this.themes))
        this.newTheme = {
          name: '',
          image: '',
          easyQuestion: '',
          hardQuestion: '',
          isMystery: false,
          timer: 10
        }
      } else {
        alert('Veuillez remplir tous les champs nécessaires.')
      }
    },
    deleteTheme(index) {
      this.themes.splice(index, 1)
      localStorage.setItem('phase3Themes', JSON.stringify(this.themes))
    },
    resetQuestions() {
      localStorage.removeItem('selectedQuestions')
      alert('Les questions ont été réinitialisées.')
    },
    clearAllPhase3() {
      this.themes = []
      localStorage.removeItem('phase3Themes')
      alert('Tous les thèmes ont été supprimés et réinitialisés.')
    }
  }
}
</script>

<style scoped>
.admin-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.phase-section {
  margin-bottom: 40px;
}

.form-group {
  margin-bottom: 20px;
}

button {
  padding: 10px;
  margin-top: 10px;
}

.admin-actions {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
</style>
