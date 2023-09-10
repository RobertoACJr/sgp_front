<template>
  <v-card
    class="card-project-container"
    elevation="4"
    rounded="lg"
    @click="emitClick"
  >
    <v-img
      :src="require('@/assets/WallpaperIFMS.png')"
      alt=""
      class="card-project-container__image"
    />
    <div class="card-project-container__title">
      {{ projectTitle }}
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'CardProject',
  props: {
    projectTitle: {
      type: String,
      default: '',
    },
  },
  emits: [
    'click',
  ],
  methods: {
    emitClick() {
      this.$emit('click');
    },
  }
}
</script>

<style lang="scss" scope>
.card-project-container {
  display: flex;
  gap: 16px;
  flex-direction: column;
}
</style>
