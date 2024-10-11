<template>
  <modal :close="$emit('close')">
    <template #header>
      <h1>Confirmation</h1>
    </template>
    <template #body>
      <p>Êtes-vous sûr de vouloir tout supprimer pour la Phase 3 ?</p>
    </template>
    <template #footer>
      <button @click="$emit('confirm')">Confirmer</button>
      <button @click="$emit('close')">Annuler</button>
    </template>
  </modal>
</template>
