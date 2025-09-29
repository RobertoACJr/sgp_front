<template>
  <v-container>
    <div
      class="d-flex justify-space-between"
    >
      <div
        class="text-h6 heading-6 mb-5"
      >
        Lista de Avaliadores
      </div>
      <div>
        <v-btn
          icon
          title="Recarregar Listagem"
          :disabled="loading"
          @click="getEvaluatorsByPage()"
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
          v-if="verifyPermission({ module: 'users', permission: 'create' })"
          icon
          title="Criar Avaliador"
          class="ml-3"
          :disabled="loading"
          @click="goTo('createEvaluator')"
        >
          <v-icon color="primary">
            mdi-plus
          </v-icon>
        </v-btn>
      </div>
    </div>
    <loading v-if="loading" />
    <div
      v-else-if="!getEvaluators.length"
      class="no-content"
    >
      Nenhum Avaliador Cadastrado
    </div>
    <v-row v-else>
      <v-col
        v-if="hasFilters"
        md="12"
        sm="12"
      >
        <p>Avaliadores encontrados: {{ getEvaluators.length }}</p>
        <div class="d-flex flex-wrap mt-5">
          Filtros:
          <div
            v-for="(dFilter, index) in getDisplayFilters"
            :key="index"
            class="mr-2 mb-2 filter-pill"
          >
            {{ dFilter.title }}
            <v-icon
              color="tertiary"
              @click="removerFilter(dFilter)"
            >
              mdi-alpha-x-circle-outline
            </v-icon>
          </div>
        </div>
      </v-col>
      <v-col
        v-if="!getEvaluators.length"
        md="12"
        sm="12"
        class="mt-5"
      >
        Nenhum Avaliador Para os filtros selecionados
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
                Nome
              </th>
              <th class="text-left">
                E-mail
              </th>
              <th class="text-center">
                Áreas do Conhecimento
              </th>
              <th class="text-center">
                Tipo
              </th>
              <th class="text-center">
                Cadastro reconhecido
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(evaluator, index) in getEvaluators"
              :key="index"
              @click="goToEvaluator(evaluator)"
            >
              <td class="text-body-2">
                {{ evaluator.name }}
              </td>
              <td class="text-body-2">
                {{ evaluator.email }}
              </td>
              <td class="text-body-2 text-center">
                {{ getKnowledgeAreasText(evaluator.knowledge_areas) }}
              </td>
              <td class="text-body-2 text-center">
                {{ evaluator.role?.name || "--" }}
              </td>
              <td class="text-body-2 text-center">
                <v-icon
                  :color="evaluator?.is_approved ? 'primary' : 'tertiary'"
                >
                  {{ evaluator?.is_approved ? 'mdi-checkbox-marked-circle-outline' : 'mdi-close-circle-outline' }}
                </v-icon>
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
          @update:model-value="getEvaluatorsByPage"
        />
      </v-col>
    </v-row>
  </v-container>
  <ModalFilters
    :is-open="isFiltersModalOpen"
    @apply-filters="filter"
    @close="() => isFiltersModalOpen = false"
  />
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations } from 'vuex';

import ModalFilters from '@/modules/evaluator/components/ModalFilters.vue';

import * as evaluatorService from '@/modules/evaluator/services/evaluator.service';

export default defineComponent({
  name: 'ListEvaluators',
  components: {
    ModalFilters,
  },
  data: () => ({
    loading: false,
    isFiltersModalOpen: false,
  }),
  computed: {
    ...mapGetters('permissions', [
      'verifyPermission',
      'getIsAdmin',
    ]),
    ...mapGetters('evaluator', [
      'getEvaluators',
      'getFetchEvaluatorsList',
      'getCurrentPage',
      'getLengthOfPages',
      'getDisplayFilters',
      'getFiltersToFetch',
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
      return Boolean(this.getDisplayFilters.length);
    },
  },
  mounted() {
    this.getFetchEvaluatorsList && this.getEvaluatorsByPage();
    this.setFetchEvaluator(true);
  },
  methods: {
    ...mapMutations('evaluator', [
      'setEvaluators',
      'setCurrentPage',
      'setLengthOfPages',
      'setCurrentEvaluator',
      'setFetchEvaluator',
      'setFetchEvaluatorsList',
      'removeFilter'
    ]),
    goToEvaluator(evaluator) {
      this.setCurrentEvaluator(evaluator);
      this.goTo('showEvaluator')
    },
    goTo(name) {
      this.$router.push({ name });
    },
    getParams() {
      return {
        page: this.getCurrentPage,
        per_page: 100,
        ...this.getFiltersToFetch
      }
    },
    getEvaluatorsByPage() {
      this.loading = true
      let params = this.getParams()
      evaluatorService.list(params)
        .then((response) => {
          this.setEvaluators(response.data);
          this.loading = false;
          this.setLengthOfPages(response?.meta?.pages || 1);
          this.setFetchEvaluatorsList(false);
        })
        .catch(() => {
          this.loading = false;
        })
    },
    removerFilter(filter) {
      this.removeFilter(filter)
      this.getEvaluatorsByPage()
    },
    getKnowledgeAreasText(knowledgeAreas) {
      return knowledgeAreas
        ? knowledgeAreas.map(({ prefix }) => prefix).join(", ")
        : "---"
    },
    filter() {
      this.currentPage = 1;
      this.getEvaluatorsByPage()
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
