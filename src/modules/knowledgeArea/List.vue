<template>
  <v-container>
    <div
      class="d-flex justify-space-between"
    >
      <div
        class="text-h6 heading-6 mb-5"
      >
        Lista de Áreas do Conhecimento
      </div>
      <div>
        <v-btn
          icon
          title="Recarregar Listagem"
          :disabled="loading"
          @click="getKnowledgeAreasByPage()"
        >
          <v-icon
            color="secondary"
          >
            mdi-sync
          </v-icon>
        </v-btn>
        <v-btn
          v-if="verifyPermission({ module: 'knowledge-areas', permission: 'create' })"
          icon
          title="Criar Área do Conhecimento"
          class="ml-3"
          :disabled="loading"
          @click="goTo('createKnowledgeArea')"
        >
          <v-icon color="primary">
            mdi-plus
          </v-icon>
        </v-btn>
      </div>
    </div>
    <loading v-if="loading" />
    <div
      v-else-if="!getKnowledgeAreas || !getKnowledgeAreas.length"
      class="no-content"
    >
      Nenhuma Área do Conhecimento Cadastrada
    </div>
    <v-row v-else>
      <v-col
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
                Prefixo
              </th>
              <th class="text-left">
                Descrição
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(knowledgeArea, index) in getKnowledgeAreas"
              :key="index"
              @click="goToKnowledgeArea(knowledgeArea)"
            >
              <td class="text-body-2">
                {{ knowledgeArea.prefix }}
              </td>
              <td class="text-body-2">
                {{ knowledgeArea.description }}
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
          @update:model-value="getKnowledgeAreasByPage"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations } from 'vuex';

import * as knowledgeAreaService from '@/modules/knowledgeArea/services/knowledgeArea.service.js';

export default defineComponent({
  name: 'ListKnowledgeArea',

  data: () => ({
    loading: false,
  }),

  computed: {
    ...mapGetters('permissions', [
      'verifyPermission',
    ]),
    ...mapGetters('knowledgeArea', [
      'getKnowledgeAreas',
      'getFetchKnowledgeAreasList',
      'getCurrentPage',
      'getLengthOfPages',
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
    this.getFetchKnowledgeAreasList && this.getKnowledgeAreasByPage();
    this.setFetchKnowledgeArea(true);
  },

  methods: {
    ...mapMutations('knowledgeArea', [
      'setKnowledgeAreas',
      'setCurrentPage',
      'setLengthOfPages',
      'setCurrentKnowledgeArea',
      'setFetchKnowledgeArea',
      'setFetchKnowledgeAreasList',
    ]),

    goToKnowledgeArea(knowledgeArea) {
      this.setCurrentKnowledgeArea(knowledgeArea);
      this.goTo('showKnowledgeArea')
    },

    goTo(name) {
      this.$router.push({ name });
    },

    getParams() {
      return {
        page: this.getCurrentPage,
        per_page: 100,
      }
    },

    getKnowledgeAreasByPage() {
      this.loading = true
      knowledgeAreaService.list()
        .then((response) => {
          this.setKnowledgeAreas(response.data);
          this.loading = false;
          this.setLengthOfPages(response?.meta?.pages || 1);
          this.setFetchKnowledgeAreasList(false);
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
