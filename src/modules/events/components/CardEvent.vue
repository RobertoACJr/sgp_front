<template>
  <v-card
    class="card-event-container"
    elevation="4"
    rounded="lg"
  >
    <v-img
      :src="require('@/assets/WallpaperIFMS.png')"
      alt=""
      class="card-event-container__image"
    />
    <div class="card-event-container__title">
      {{ eventTitle }}
    </div>
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
}
</script>

<style lang="scss" scope>
.card-event-container {
  display: flex;
  gap: 16px;
  flex-direction: column;
}
</style>
