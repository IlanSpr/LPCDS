<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <header>
        <slot name="header"></slot>
        <button class="close-button" @click="close">&times;</button>
      </header>
      <main>
        <slot name="body"></slot>
      </main>
      <footer>
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    close: {
      type: Function,
      required: true
    }
  },
  mounted() {
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden'
  },
  beforeUnmount() {
    // Restore scrolling when modal is closed
    document.body.style.overflow = ''
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  border-radius: 8px;
  padding: 20px;
  width: 400px;
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

footer {
  display: flex;
  justify-content: space-between;
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
</style>
