<template>
  <v-container>
    aqui vai ter algumas infos do projeto eu acho e uma opção de começar a avaliação...
    <v-btn 
      block
      class="mt-8"
      color="tertiary"
      size="large"
      variant="tonal"
      @click="rateProject"
    >
      Avaliar Projeto
    </v-btn>
  </v-container>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ShowProject',
  methods: {
    rateProject() {
      this.$router.push({ name: 'rateProject' });
    },
  },
});
</script>
