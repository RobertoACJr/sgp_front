<template>
  <div class="loading-container">
    <v-progress-circular
      :size="50"
      color="primary"
      indeterminate
    />
  </div>
</template>

<script>
export default {
  name: 'Loading',
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
