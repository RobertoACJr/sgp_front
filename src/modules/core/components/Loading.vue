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

<style lang="scss" scope>
.loading-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  background-color: #575c5636
}
</style>
