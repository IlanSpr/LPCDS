<template>
  <modal @close="$emit('close')" :close="closeModal">
    <template #header>
      <h2>{{ isEdit ? 'Modifier' : 'Ajouter' }} un élément</h2>
    </template>

    <template #body>
      <div class="form-group">
        <label>Nom :</label>
        <input
          v-model="localTheme.name"
          class="wide-input"
          type="text"
          placeholder="Nom de l'élément"
        />

        <label>Question Facile :</label>
        <textarea
          v-model="localTheme.easyQuestion"
          class="wide-input"
          placeholder="Question Facile"
        ></textarea>

        <label>Question Difficile :</label>
        <textarea
          v-model="localTheme.hardQuestion"
          class="wide-input"
          placeholder="Question Difficile"
        ></textarea>
      </div>
    </template>

    <template #footer>
      <div class="button-group">
        <button class="add-btn" @click="submitForm">
          {{ isEdit ? 'Mettre à jour' : 'Ajouter' }}
        </button>
        <button class="close-btn" @click="$emit('close')">Annuler</button>
      </div>
    </template>
  </modal>
</template>

<script>
import Modal from './ModalComp.vue'

export default {
  components: { Modal },
  props: {
    theme: Object,
    isEdit: Boolean,
    closeModal: Function // Keep this prop for closing
  },
  data() {
    return {
      localTheme: this.theme
        ? { ...this.theme }
        : {
            name: '',
            active: true,
            easyQuestion: '',
            hardQuestion: ''
          }
    }
  },
  methods: {
    submitForm() {
      this.$emit('submit', this.localTheme)
    }
  }
}
</script>

<style scoped>
.form-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.wide-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

button {
  background-color: white;
  color: black;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #e0e0e0;
}
</style>
