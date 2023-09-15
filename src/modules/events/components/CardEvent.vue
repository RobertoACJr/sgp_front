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
    >
      <v-card-title
        v-text="eventTitle"
      />
    </v-img>
  </v-card>
</template>

<script>
export default {
  name: 'CardEvent',
  props: {
    eventTitle: {
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

</style>
