<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(event, key) in projects"
        :key="key"
        md="4"
      >
        <CardProject
          :event-title="event.title"
          @click="goToProject(event)"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { defineComponent } from 'vue';
import { mapMutations } from 'vuex';
import CardProject from '@/modules/projects/components/CardProject.vue';

export default defineComponent({
  name: 'ListProjects',
  components: {
    CardProject,
  },
  data: () => ({
    projects: [
      { title: 'primeiro prtojeto' },
      { title: 'segundo prtojeto' },
      { title: 'terceiro prtojeto' },
      { title: 'quarto prtojeto' },
      { title: 'quinto prtojeto' },
    ],
  }),
  methods: {
    ...mapMutations('projects', [
      'setCurrentProject',
    ]),
    goToProject(event) {
      this.setCurrentProject(event);
      this.$router.push({ name: 'showProject' });
    },
  },
});
</script>
