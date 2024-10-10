<template>
  <component
    :is="tag"
    :type="tag === 'button' ? nativeType : ''"
    @click="handleClick"
    class="btn"
    :class="classes"
  >
    <slot>{{ text }}</slot>
  </component>
</template>

<script>
export default {
  name: 'base-button',
  props: {
    tag: {
      type: String,
      default: 'button'
    },
    nativeType: {
      type: String,
      default: 'button'
    },
    text: {
      type: String,
      default: ''
    }
  },
  computed: {
    classes() {
      return ['btn']
    }
  },
  methods: {
    handleClick(evt) {
      this.$emit('click', evt)
    }
  }
}
</script>

<style scoped>
.btn {
  background-color: white;
  color: black;
  font-weight: bold;
  border-radius: 20px;
  padding: 15px 30px;
  text-align: center;
  width: 200px;
  transition:
    background-color 0.3s,
    color 0.3s;
  cursor: pointer;
  border: none; /* Remove the border */
}

.btn:hover {
  background-color: black;
  color: white;
}
</style>
