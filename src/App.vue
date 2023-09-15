<template>
  <v-app>
    <v-app-bar
      v-if="getShowNavBar"
      color="light_primary"
      density="compact"
      title=""
      variant="text"
    >
      <v-btn
        v-if="getHasViewToGoBack"
        icon
        :to="{ name: getHasViewToGoBack }"
      >
        <v-icon
          color="primary"
        >
          mdi-arrow-left-circle-outline
        </v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'App',

  computed: {
    ...mapGetters([
      'getShowNavBar',
      'getHasViewToGoBack',
    ])
  },

  mounted() {
    this.$router.push({ name: "listEvents" });
  },

  methods: {
    ...mapActions("auth", ["isSigned"]),
    goBack() {
      
    },
  },
}
</script>
