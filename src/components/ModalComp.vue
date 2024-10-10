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
  width: 400px; /* Largeur augmentée pour plus de confort */
  position: relative; /* Pour le positionnement du bouton de fermeture */
}
.close-button {
  position: absolute; /* Positionne le bouton x en haut à droite */
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
}
footer {
  display: flex;
  justify-content: space-between; /* Pour l'espace entre les boutons */
}
button {
  margin-left: 10px; /* Espace entre les boutons */
}
</style>
