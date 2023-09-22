<template>
  <v-container>
    <div
      class="d-flex justify-space-between"
    >
      <div
        class="text-h6 heading-6 mb-5"
      >
        Lista de Projetos
      </div>
      <v-btn
        v-if="getIsAdmin && !loading"
        icon
        title="Recarregar Listagem"
        @click="getProjectsByPage(1)"
      >
        <v-icon
          color="primary"
        >
          mdi-sync
        </v-icon>
      </v-btn>
    </div>
    <loading v-if="loading" />
    <div
      v-else-if="!getProjects.length"
      class="no-content"
    >
      Nenhum Projeto Encontrado
    </div>
    <v-row v-else-if="getIsAdmin">
      <v-col
        md="12"
        sm="12"
      >
        <v-table
          fixed-header
          height="70vh"
        >
          <thead>
            <tr>
              <th class="text-left">
                Código
              </th>
              <th class="text-left">
                Nome do Projeto
              </th>
              <th class="text-center">
                Quantidade de Avaliações
              </th>
              <th class="text-center">
                Média
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(project, index) in getProjects"
              :key="index"
              @click="goToProject(project)"
            >
              <td class="text-body-2">
                {{ project.code }}
              </td>
              <td class="text-body-2">
                {{ project.title }}
              </td>
              <td class="text-body-2 text-center">
                {{ project.evaluations_quantity || "não avaliado" }}
              </td>
              <td class="text-body-2 text-center">
                {{ project.average ? project.average.toFixed(2) : "não avaliado" }}
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
      <v-col
        v-if="getLenghtOfPages > 1"
        md="12"
      >
        <v-pagination
          v-model="currentPage"
          :length="getLenghtOfPages"
          rounded="circle"
          @update:model-value="getProjectsByPage"
        />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col
        v-for="(project, key) in getProjects"
        :key="key"
        cols="12"
        md="4"
        sm="6"
      >
        <CardProject
          :project-title="project.title"
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

import * as projectService from '@/modules/projects/services/projects.service';

export default defineComponent({
  name: 'ListProjects',
  components: {
    CardProject,
  },
  data: () => ({
    loading: false,
  }),
  computed: {
    ...mapGetters('permissions', [
      'getIsAdmin',
    ]),
    ...mapGetters('projects', [
      'getProjects',
      'getFetchProjectsList',
      'getCurrentPage',
      'getLenghtOfPages',
    ]),
    currentPage: {
      get() {
        return this.getCurrentPage;
      },
      set(value) {
        this.setCurrentPage(value);
      }
    },
  },
  mounted() {
    this.getFetchProjectsList && this.getProjectsByPage();
  },
  methods: {
    ...mapMutations('projects', [
      'setProjects',
      'setCurrentPage',
      'setLenghtOfPages',
      'setCurrentProject',
      'setFetchProjectsList',
    ]),
    goToProject (project) {
      this.setCurrentProject(project);
      this.$router.push({ name: 'showProject' });
    },
    getProjectsByPage () {
      this.loading = true;
      let params = {};
      if (this.getIsAdmin) {
        params = { page: this.getCurrentPage };
      }
      projectService.list(params)
        .then((response) => {
          this.setProjects(response.data);
          this.loading = false;
          this.setLenghtOfPages(response?.meta?.pages || 1);
          this.setFetchProjectsList(false);
        })
        .catch(() => {
          this.loading = false;
        })
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
