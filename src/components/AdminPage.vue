<template>
  <div class="admin-page">
    <router-link to="/home" class="back-button">
      <i class="fas fa-arrow-left"></i> Retour
    </router-link>

    <h1>Gestion des Phases</h1>

    <h2>Phase 2</h2>
    <button @click="showAddCategoryPopup = true">Nouvelle Catégorie</button>
    <div class="admin-actions">
      <button @click="confirmClearAllPhase2">Tout supprimer</button>
    </div>

    <h3>Catégories existantes :</h3>
    <div class="category-list">
      <div v-for="(category, index) in phase2Themes" :key="index" class="category-card">
        {{ category.name }} - État : {{ category.active ? 'Actif' : 'Inactif' }}
        <button @click="forceCategoryActive(index)">Activer</button>
        <button @click="deleteCategory(index)">Supprimer</button>
      </div>
    </div>

    <div class="form-group">
      <label>Durée du Timer Phase 2 (s) :</label>
      <input v-model.number="phase2Timer" type="number" placeholder="90" />
      <button @click="saveTimerValue('phase2Timer', phase2Timer)">Enregistrer</button>
    </div>

    <h2>Phase 3</h2>
    <button @click="showAddThemePopup = true">Nouvel Élément</button>
    <div class="admin-actions">
      <button @click="confirmClearAllPhase3">Tout supprimer</button>
    </div>

    <h3>Éléments existants :</h3>
    <div class="theme-list">
      <div v-for="(theme, index) in phase3Themes" :key="index" class="theme-card">
        <img v-if="theme.image" :src="theme.image" alt="Thème Image" class="theme-image" />
        <h4>{{ theme.name }} - État : {{ theme.active ? 'Actif' : 'Inactif' }}</h4>
        <button @click="forceThemeActive(index)">Activer</button>
        <button @click="showEditThemePopupPhase3(index)">Modifier</button>
        <button @click="deleteTheme(index)">Supprimer</button>
      </div>
    </div>

    <div class="form-group">
      <label>Durée du Timer Phase 3 (s) :</label>
      <input v-model.number="phase3Timer" type="number" placeholder="10" />
      <button @click="saveTimerValue('phase3Timer', phase3Timer)">Enregistrer</button>
    </div>

    <!-- Popup pour Ajouter Catégorie -->
    <modal v-if="showAddCategoryPopup" @close="showAddCategoryPopup = false">
      <template #header>
        <h2>Ajouter une Catégorie</h2>
        <button class="close-button" @click="showAddCategoryPopup = false">&times;</button>
      </template>
      <template #body>
        <div>
          <label>Nom de la Catégorie :</label>
          <input v-model="newCategory" placeholder="Nom de la catégorie" />
        </div>
      </template>
      <template #footer>
        <button @click="addCategory">Ajouter</button>
        <button @click="showAddCategoryPopup = false">Annuler</button>
      </template>
    </modal>

    <!-- Popup pour Ajouter Élément -->
    <modal v-if="showAddThemePopup" @close="showAddThemePopup = false">
      <template #header>
        <h2>Ajouter un Élément</h2>
        <button class="close-button" @click="showAddThemePopup = false">&times;</button>
      </template>
      <template #body>
        <div>
          <label>Nom du Thème :</label>
          <input v-model="newTheme.name" placeholder="Nom du thème" />

          <label>Image du Thème (optionnel) :</label>
          <input type="file" @change="onFileChange" accept="image/*" />

          <label>Question Facile :</label>
          <input v-model="newTheme.easyQuestion" placeholder="Question facile" />

          <label>Question Difficile :</label>
          <input v-model="newTheme.hardQuestion" placeholder="Question difficile" />
        </div>
      </template>
      <template #footer>
        <button @click="addTheme">Ajouter</button>
        <button @click="showAddThemePopup = false">Annuler</button>
      </template>
    </modal>

    <!-- Popup pour Éditer Élément -->
    <modal v-if="showEditThemePopup" @close="showEditThemePopup = false">
      <template #header>
        <h2>Modifier l'Élément</h2>
        <button class="close-button" @click="showEditThemePopup = false">&times;</button>
      </template>
      <template #body>
        <div>
          <label>Nom du Thème :</label>
          <input v-model="editTheme.name" placeholder="Nom du thème" />

          <label>Image du Thème (optionnel) :</label>
          <input type="file" @change="onEditFileChange" accept="image/*" />

          <label>Question Facile :</label>
          <input v-model="editTheme.easyQuestion" placeholder="Question facile" />

          <label>Question Difficile :</label>
          <input v-model="editTheme.hardQuestion" placeholder="Question difficile" />
        </div>
      </template>
      <template #footer>
        <button @click="updateTheme">Modifier</button>
        <button @click="showEditThemePopup = false">Annuler</button>
      </template>
    </modal>

    <!-- Popup de Confirmation pour Tout Supprimer Phase 2 -->
    <modal v-if="showConfirmClearPhase2" @close="showConfirmClearPhase2 = false">
      <template #header>
        <h2>Confirmation</h2>
        <button class="close-button" @click="showConfirmClearPhase2 = false">&times;</button>
      </template>
      <template #body>
        <p>Êtes-vous sûr de vouloir tout supprimer pour la Phase 2 ?</p>
      </template>
      <template #footer>
        <button @click="clearAllPhase2">Confirmer</button>
        <button @click="showConfirmClearPhase2 = false">Annuler</button>
      </template>
    </modal>

    <!-- Popup de Confirmation pour Tout Supprimer Phase 3 -->
    <modal v-if="showConfirmClearPhase3" @close="showConfirmClearPhase3 = false">
      <template #header>
        <h2>Confirmation</h2>
        <button class="close-button" @click="showConfirmClearPhase3 = false">&times;</button>
      </template>
      <template #body>
        <p>Êtes-vous sûr de vouloir tout supprimer pour la Phase 3 ?</p>
      </template>
      <template #footer>
        <button @click="clearAllPhase3">Confirmer</button>
        <button @click="showConfirmClearPhase3 = false">Annuler</button>
      </template>
    </modal>
  </div>
</template>

<script>
import Modal from './ModalComp.vue' // Importation du composant Modal

export default {
  components: {
    Modal
  },
  data() {
    return {
      // Phase 2 data
      newCategory: '',
      phase2Themes: JSON.parse(localStorage.getItem('phase2Themes')) || [],
      phase2Timer: parseInt(localStorage.getItem('phase2Timer')) || 90,
      showAddCategoryPopup: false,
      showConfirmClearPhase2: false,

      // Phase 3 data
      phase3Themes: JSON.parse(localStorage.getItem('phase3Themes')) || [],
      phase3Timer: parseInt(localStorage.getItem('phase3Timer')) || 10,
      newTheme: {
        name: '',
        image: '',
        easyQuestion: '',
        hardQuestion: ''
      },
      showAddThemePopup: false,
      showEditThemePopup: false,
      editThemeIndex: null,
      editTheme: {
        name: '',
        image: '',
        easyQuestion: '',
        hardQuestion: ''
      },
      showConfirmClearPhase3: false
    }
  },
  methods: {
    // Phase 2 methods
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
    },
    confirmClearAllPhase2() {
      this.showConfirmClearPhase2 = true
    },
    saveTimerValue(timerType, value) {
      this[timerType] = value
      localStorage.setItem(timerType, value)
    },

    // Phase 3 methods
    addTheme() {
      if (this.newTheme.name.trim()) {
        this.phase3Themes.push({
          name: this.newTheme.name.trim(),
          image: this.newTheme.image,
          active: true,
          easyQuestion: this.newTheme.easyQuestion,
          hardQuestion: this.newTheme.hardQuestion
        })
        localStorage.setItem('phase3Themes', JSON.stringify(this.phase3Themes))
        this.newTheme = { name: '', image: '', easyQuestion: '', hardQuestion: '' }
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
    },
    confirmClearAllPhase3() {
      this.showConfirmClearPhase3 = true
    },
    onFileChange(event) {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.newTheme.image = e.target.result
        }
        reader.readAsDataURL(file)
      }
    },
    onEditFileChange(event) {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.editTheme.image = e.target.result
        }
        reader.readAsDataURL(file)
      }
    },
    showEditThemePopupPhase3(index) {
      this.editThemeIndex = index
      this.editTheme = { ...this.phase3Themes[index] }
      this.showEditThemePopup = true
    },
    updateTheme() {
      this.phase3Themes[this.editThemeIndex] = { ...this.editTheme }
      localStorage.setItem('phase3Themes', JSON.stringify(this.phase3Themes))
      this.showEditThemePopup = false
    }
  }
}
</script>

<style scoped>
/* Styles pour AdminPage.vue */
.admin-page {
  padding: 20px;
}
.category-list,
.theme-list {
  display: flex;
  flex-direction: column;
}
.category-card,
.theme-card {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
}
.form-group {
  margin: 20px 0;
}
.back-button {
  display: inline-block;
  margin-bottom: 20px;
  font-weight: bold;
}
.theme-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
}
</style>
