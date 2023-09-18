<template>
  <v-card
    elevation="4"
    rounded="lg"
    color="primary"
    variant="text"
    @click="emitClick"
  >
    <v-img
      :src="require('@/assets/WallpaperIFMS.png')"
      class="align-end"
      height="200px"
      cover
    />
    <v-card-title
      v-text="projectTitle"
    />
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

<style lang="scss" scoped>
.v-card-title {
  font-size: 14px;
  line-height: initial;
}
</style>
