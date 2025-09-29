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
      <div
        v-if="getIsAdmin"
      >
        <v-btn
          icon
          :disabled="loading"
          class="mr-3"
          title="Exportar Ranking de Projetos"
          @click="exportProjectsRanking"
        >
          <v-icon
            color="primary"
          >
            mdi-file-download-outline
          </v-icon>
        </v-btn>
        <v-btn
          icon
          class="mr-3"
          :disabled="loading"
          title="Exportar Informações dos Avaliadores"
          @click="exportEvaluators"
        >
          <v-icon
            color="primary"
          >
            mdi-account-circle-outline
          </v-icon>
        </v-btn>
        <v-btn
          icon
          title="Recarregar Listagem"
          :disabled="loading"
          @click="getProjectsByPage()"
        >
          <v-icon
            color="secondary"
          >
            mdi-sync
          </v-icon>
        </v-btn>
        <v-btn
          icon
          title="Filtrar resultados"
          class="ml-3"
          :disabled="loading"
          @click="() => isFiltersModalOpen = true"
        >
          <v-icon
            :color="hasFilters ? 'primary' : 'secondary'"
          >
            mdi-filter-outline
          </v-icon>
        </v-btn>
        <v-btn
          icon
          title="Criar Projeto"
          class="ml-3"
          @click="() => $router.push({ name: 'createProject' })"
        >
          <v-icon color="primary">
            mdi-plus
          </v-icon>
        </v-btn>
      </div>
    </div>
    <loading
      v-if="loading"
      :text="loadingText"
    />
    <div
      v-else-if="!getProjects.length"
      class="no-content"
    >
      Nenhum Projeto Encontrado
    </div>
    <v-row v-else-if="getIsAdmin">
      <v-col
        v-if="hasFilters"
        md="12"
        sm="12"
      >
        <p>Projetos encontrados: {{ getFilteredProjects.length }}</p>
        <div class="d-flex flex-wrap mt-5">
          Filtros:
          <div
            v-for="(filter, index) in filters"
            :key="index"
            class="mr-2 mb-2 filter-pill"
          >
            {{ filter.title }}
            <v-icon
              color="tertiary"
              @click="removeFilter(filter)"
            >
              mdi-alpha-x-circle-outline
            </v-icon>
          </div>
        </div>
      </v-col>
      <v-col
        v-if="!getFilteredProjects.length"
        md="12"
        sm="12"
        class="mt-5"
      >
        Nenhum Projeto Para os filtros selecionados
      </v-col>
      <v-col
        v-else
        md="12"
        sm="12"
        class="mt-5"
      >
        <v-table
          fixed-header
          height="75vh"
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
              v-for="(project, index) in getFilteredProjects"
              :key="index"
              @click="goToProject(project)"
            >
              <td class="text-body-2">
                {{ project.code }}
              </td>
              <td class="text-body-2">
                {{ project.location ? `${project.location} -` : "" }}{{ project.title }}
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
        v-if="getLengthOfPages > 1"
        md="12"
      >
        <v-pagination
          v-model="currentPage"
          :length="getLengthOfPages"
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
          :project-title="`${project.location ? project.location + ' - ' : ''}${project.title}`"
          @click="goToProject(project)"
        />
      </v-col>
    </v-row>
  </v-container>
  <ModalFilters
    :is-open="isFiltersModalOpen"
    @set-filters="(newFilters) => filters = newFilters"
    @close="() => isFiltersModalOpen = false"
  />
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations } from 'vuex';

import CardProject from '@/modules/projects/components/CardProject.vue';
import ModalFilters from '@/modules/projects/components/ModalFilters.vue';

import * as projectService from '@/modules/projects/services/projects.service';
import * as exportService from '@/modules/projects/services/export.service';

export default defineComponent({
  name: 'ListProjects',
  components: {
    CardProject,
    ModalFilters,
  },
  data: () => ({
    loading: false,
    loadingText: "",
    filters: [],
    isFiltersModalOpen: false,
  }),
  computed: {
    ...mapGetters('permissions', [
      'getIsAdmin',
    ]),
    ...mapGetters('projects', [
      'getProjects',
      'getFetchProjectsList',
      'getCurrentPage',
      'getLengthOfPages',
      'getCategoryFilter',
      'getTeachingLevelFilter',
      'getKnowledgeAreaFilter',
    ]),
    currentPage: {
      get() {
        return this.getCurrentPage;
      },
      set(value) {
        this.setCurrentPage(value);
      }
    },
    hasFilters() {
      return Boolean(
        this.getCategoryFilter?.length ||
        this.getTeachingLevelFilter?.length ||
        this.getKnowledgeAreaFilter?.length
      );
    },
    getFilteredProjects() {
      return this.getProjects.filter(project => {
        return this.projectHasFilteredCategory(project.category) &&
          this.projectHasFilteredKnoledgeArea(project.knowledge_area) &&
          this.projectHasFilteredTeachingLevel(project.teaching_level)
      })
    },
  },
  mounted() {
    this.getFetchProjectsList && this.getProjectsByPage();
    this.filters = [
      ...this.getCategoryFilter ? this.getCategoryFilter.map(f => ({ title: f, type: 'category' })) : [],
      ...this.getTeachingLevelFilter ? this.getTeachingLevelFilter.map(f => ({ title: f, type: 'teaching_level' })) : [],
      ...this.getKnowledgeAreaFilter ? this.getKnowledgeAreaFilter.map(f => ({ title: f, type: 'knowledge_area' })) : [],
    ]
    this.setFetchProject(true);
  },
  methods: {
    ...mapMutations('projects', [
      'setProjects',
      'setCurrentPage',
      'setLengthOfPages',
      'setCurrentProject',
      'setFetchProject',
      'setFetchProjectsList',
      'setCategoryFilter',
      'setTeachingLevelFilter',
      'setKnowledgeAreaFilter',
    ]),
    goToProject (project) {
      this.setCurrentProject(project);
      this.$router.push({ name: 'showProject' });
    },
    getProjectsByPage () {
      this.loading = true;
      this.loadingText = "Buscando projetos..."
      let params = {};
      if (this.getIsAdmin) {
        params = {
          page: this.getCurrentPage,
          perPage: 100,
        };
      }
      projectService.list(params)
        .then((response) => {
          this.setProjects(response.data);
          this.loading = false;
          this.setLengthOfPages(response?.meta?.pages || 1);
          this.setFetchProjectsList(false);
        })
        .catch(() => {
          this.loading = false;
        })
    },
    exportProjectsRanking () {
      this.loading = true;
      this.loadingText = "Exportando..."
      exportService.exportProjectsRanking()
        .then((response) => {
          response?.data?.url && window.open(response.data.url, '_blank')
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        })
    },
    exportEvaluators () {
      this.loading = true;
      this.loadingText = "Exportando"
      exportService.exportEvaluators()
        .then((response) => {
          response?.data?.url && window.open(response.data.url, '_blank')
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        })
    },
    projectHasFilteredCategory (category) {
      return !this.getCategoryFilter || !this.getCategoryFilter.length || this.getCategoryFilter.includes(category);
    },
    projectHasFilteredTeachingLevel (teachingLevel) {
      return !this.getTeachingLevelFilter || !this.getTeachingLevelFilter.length || this.getTeachingLevelFilter.includes(teachingLevel);
    },
    projectHasFilteredKnoledgeArea (knowledgeArea) {
      return !this.getKnowledgeAreaFilter ||
        !this.getKnowledgeAreaFilter.length ||
        this.getKnowledgeAreaFilter.find(f => f.includes(knowledgeArea));
    },
    removeFilter(filter) {
      if (filter.type == 'category') {
        this.setCategoryFilter(this.getCategoryFilter.filter(f => f != filter.title));
      }
      if (filter.type == 'teaching_level') {
        this.setTeachingLevelFilter(this.getTeachingLevelFilter.filter(f => f != filter.title));
      }
      if (filter.type == 'knowledge_area') {
        this.setKnowledgeAreaFilter(this.getKnowledgeAreaFilter.filter(f => f != filter.title));
      }
      this.filters = this.filters.filter(f => f != filter);
    }
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
.filter-pill {
  border: solid 1px rgb(var(--v-theme-secondary));
  border-radius: 12px;
  padding: 4px 8px;
  color: rgb(var(--v-theme-secondary));
  background-color: rgb(var(--v-theme-secondary), 0.05);
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 16px;
}
</style>
