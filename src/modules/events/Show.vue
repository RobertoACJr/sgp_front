<template>
  <v-container>
    n sei o que botar aqui, mas serão algumas informações do evento, e uma op para ir até a listagem de projetos
    <v-button @click="() => $router.push({ name: 'listProjects' })">
      por enquanto clique aqui para ver a lista de projetos
    </v-button>
  </v-container>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ShowEvent',
});
</script>
