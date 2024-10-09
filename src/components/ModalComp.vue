<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal">
      <header>
        <slot name="header"></slot>
      </header>
      <div class="modal-body">
        <slot name="body"></slot>
      </div>
      <footer>
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalComp',
  methods: {
    close() {
      this.$emit('close')
    }
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
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
header {
  font-size: 1.5em;
  margin-bottom: 10px;
}
.modal-body {
  margin-bottom: 20px;
}
footer {
  display: flex;
  justify-content: flex-end;
}
</style>
