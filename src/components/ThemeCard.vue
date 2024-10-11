<template>
  <div class="theme-card" :class="{ inactive: !theme.active }" @click="editTheme">
    <div class="theme-info">
      <span class="theme-name">{{ theme.name }}</span>
      <div class="questions">
        <p><strong>Question facile :</strong> {{ theme.easyQuestion }}</p>
        <p><strong>Question difficile :</strong> {{ theme.hardQuestion }}</p>
      </div>
    </div>
    <div class="theme-actions">
      <button class="delete-btn" @click.stop="$emit('delete', index)">x</button>
      <button @click.stop="activateTheme">Activer</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    theme: Object,
    index: Number
  },
  methods: {
    editTheme() {
      this.$emit('edit', this.index)
    },
    activateTheme() {
      this.$emit('activate', this.index)
    }
  }
}
</script>

<style scoped>
.theme-card {
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: space-between;
}

.theme-image {
  width: 80px;
  height: auto;
  object-fit: cover;
  margin-right: 10px;
}

.theme-info {
  flex: 1;
  text-align: left;
}

.theme-name {
  font-weight: bold;
  font-size: 1.2rem;
}

.questions {
  margin-top: 10px;
  font-size: 0.9rem;
}

.theme-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

button {
  background-color: white;
  color: black;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  margin-top: 5px;
}

.delete-btn {
  color: black; /* Text color for delete button */
}

.theme-card.inactive {
  background-color: #f0f0f0;
}
</style>
