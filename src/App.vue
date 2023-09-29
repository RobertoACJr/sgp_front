<template>
  <v-app>
    <NavBar />
    <v-main>
      <v-container class="h-100">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
  <Toast />
</template>

<script>
import Toast from '@/modules/core/components/Toast.vue';
import NavBar from '@/modules/core/components/NavBar.vue';

export default {
  name: 'App',

  components: {
    Toast,
    NavBar,
  },

  mounted() {
    this.$router.push({ name: "listEvents" });
  },
}
</script>
