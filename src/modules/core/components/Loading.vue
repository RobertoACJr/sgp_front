<template>
  <div class="loading-container d-flex flex-column ga-4">
    <v-progress-circular
      :size="50"
      color="primary"
      indeterminate
    />
    <span
      v-if="!!text"
      class="font-weight-bold"
    >
      {{ text }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'Loading',

  props: {
    text: {
      type: String,
      default: ""
    }
  }
}
</script>

<style lang="scss" scoped>
.loading-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  background-color: rgb(var(--v-theme-light_gray))
}
</style>
