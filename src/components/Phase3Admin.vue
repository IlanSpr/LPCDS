<template>
  <div class="phase3-admin">
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
        <div class="theme-actions">
          <button @click="forceThemeActive(index)">Activer</button>
          <button @click="showEditThemePopupPhase3(index)">Modifier</button>
          <button @click="deleteTheme(index)">Supprimer</button>
        </div>
      </div>
    </div>

    <div class="form-group timer-group">
      <label class="timer-label">Durée du Timer Phase 3 (s) :</label>
      <input v-model.number="phase3Timer" type="number" placeholder="10" />
      <button @click="saveTimerValue('phase3Timer', phase3Timer)">Enregistrer</button>
    </div>

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
import Modal from './ModalComp.vue'

export default {
  components: { Modal },
  data() {
    return {
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
    },
    saveTimerValue(timerType, value) {
      this[timerType] = value
      localStorage.setItem(timerType, value)
    }
  }
}
</script>

<style scoped>
.phase3-admin {
  padding: 20px;
  background: rgba(227, 242, 253, 0.8); /* Fond transparent */
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* Ombre légère */
}

h2,
h3 {
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5); /* Ombre sur le texte */
  text-align: left;
}

.theme-list {
  display: flex;
  flex-direction: column;
}

.theme-card {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 5px 0;
  border-radius: 10px; /* Changé pour le style en phase 2 */
  display: flex;
  flex-direction: column; /* Aligne verticalement */
  justify-content: space-between; /* Assure l'espace entre les éléments */
}

.theme-actions {
  display: flex;
  justify-content: space-between;
}

.admin-actions {
  display: flex;
  justify-content: flex-end; /* Aligne à droite */
}

.form-group {
  margin: 20px 0;
}

.timer-group {
  display: flex;
  align-items: center; /* Aligne tous les éléments sur la même ligne */
  margin-top: 20px; /* Espacement entre le groupe de timer et les éléments */
}

.timer-label {
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

button {
  background-color: white; /* Boutons blancs */
  color: black; /* Texte noir */
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-left: 10px; /* Espace entre le bouton et l'input */
}

button:hover {
  background-color: #e0e0e0; /* Couleur de survol */
}

input {
  padding: 3px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-left: 10px; /* Espace entre le label et l'input */
}

.theme-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}
</style>
