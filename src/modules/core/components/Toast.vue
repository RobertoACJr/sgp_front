<template>
  <v-snackbar
    v-model="showSnackbar"
    :color="getColorByStatus"
    location="top right"
    multi-line
  >
    <div
      v-if="getTitle"
      class="text-subtitle-1 pb-2"
    >
      {{ getTitle }}
    </div>

    <p v-if="getText">
      {{ getText }}
    </p>

    <template
      v-if="getShowCloseBtn"
      #actions
    >
      <v-btn
        color="primary"
        variant="tonal"
        @click="showSnackbar = false"
      >
        Fechar
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
  emits: [
    "input",
  ],
  computed: {
    ...mapGetters("toast", [
      "getTitle",
      "getText",
      "getShow",
      "getColorByStatus",
      "getShowCloseBtn",
    ]),
    showSnackbar: {
      get () {
        return this.getShow;
      },
      set() {
        this.reset();
      },
    },
  },
  methods: {
    ...mapMutations("toast", [
      "reset"
    ]),
  },
}
</script>
