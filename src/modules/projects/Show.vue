<template>
  <v-container>
    aqui vai ter algumas infos do projeto eu acho e uma opção de começar a avaliação...
  </v-container>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ShowProject',
  methods: {
    rateProject(project) {
      this.setCurrentProject(project);
      this.$router.push({ name: 'rateProject' });
    },
  },
});
</script>
