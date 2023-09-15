<template>
  <v-container>
    <div
      class="text-h3 heading-3 mb-5"
    >
      Lista de Projetos
    </div>
    <loading v-if="loading" />
    <v-row v-else-if="getIsAdmin">
      <v-col :md="12">
        <v-table
          fixed-header
          height="500px"
        >
          <thead>
            <tr>
              <th class="text-left">
                Código
              </th>
              <th class="text-left">
                Nome do Projeto
              </th>
              <th class="text-left">
                Quantidade de Avaliações
              </th>
              <th class="text-left">
                Média
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(project, index) in projects"
              :key="index"
              @click="goToProject(project)"
            >
              <td>{{ project.code }}</td>
              <td>{{ project.name }}</td>
              <td>{{ project.qtd_evaluations || "não avaliado" }}</td>
              <td>{{ project.average || "não avaliado" }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
      <v-col :md="12">
        <v-pagination
          :value="currentPage"
          :length="lenghtOfPages"
          rounded="circle"
          @update:model-value="getProjectsByPage"
        />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col
        v-for="(project, key) in projects"
        :key="key"
        md="4"
      >
        <CardProject
          :project-title="project.name"
          @click="goToProject(project)"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations } from 'vuex';
import CardProject from '@/modules/projects/components/CardProject.vue';

export default defineComponent({
  name: 'ListProjects',
  components: {
    CardProject,
  },
  data: () => ({
    loading: false,
    projects: [
      { code: 'abs', qtd_evaluations: 2, name: 'primeiro projeto', average: 5.5 },
      { code: 'abs', qtd_evaluations: 2, name: 'segundo projeto', average: 3.5 },
      { code: 'abs', qtd_evaluations: 2, name: 'terceiro projeto', average: 8.5 },
      { code: 'abs', qtd_evaluations: 2, name: 'quarto projeto', average: null },
      { code: 'abs', qtd_evaluations: 2, name: 'quinto projeto', average: 9.6 },
      { code: 'abs', qtd_evaluations: 2, name: 'primeiro projeto', average: 5.5 },
      { code: 'abs', qtd_evaluations: 2, name: 'segundo projeto', average: 3.5 },
      { code: 'abs', qtd_evaluations: 2, name: 'terceiro projeto', average: 8.5 },
      { code: 'abs', qtd_evaluations: 2, name: 'quarto projeto', average: null },
      { code: 'abs', qtd_evaluations: 2, name: 'quinto projeto', average: 9.6 },
      { code: 'abs', qtd_evaluations: 2, name: 'primeiro projeto', average: 5.5 },
      { code: 'abs', qtd_evaluations: 2, name: 'segundo projeto', average: 3.5 },
      { code: 'abs', qtd_evaluations: 2, name: 'terceiro projeto', average: 8.5 },
      { code: 'abs', qtd_evaluations: 2, name: 'quarto projeto', average: null },
      { code: 'abs', qtd_evaluations: 2, name: 'quinto projeto', average: 9.6 },
    ],
    currentPage: 1,
    lenghtOfPages: 4,
  }),
  computed: {
    ...mapGetters('permissions', [
      'getIsAdmin',
    ])
  },
  methods: {
    ...mapMutations('projects', [
      'setCurrentProject',
    ]),
    goToProject (event) {
      this.setCurrentProject(event);
      this.$router.push({ name: 'showProject' });
    },
    getProjectsByPage (page) {
      if (page == this.currentPage) return;
      this.currentPage = page;
      // TODO get projects
    },
  },
});
</script>

<style lang="scss" scoped>
td, th {
  color: rgb(var(--v-theme-primary));
}
td {
  cursor: pointer;
}
tr:hover {
  background-color: rgb(var(--v-theme-light_primary));
}

</style>
