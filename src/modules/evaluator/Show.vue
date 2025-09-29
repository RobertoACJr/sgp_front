<template>
  <loading v-if="loading" />
  <v-container v-else>
    <div
      class="text-h6 heading-6 mb-5 d-flex justify-space-between"
    >
      {{ getCurrentEvaluator.name }}

      <div
        v-if="getIsAdmin"
      >
        <v-btn
          icon
          :title="getCurrentEvaluator?.is_approved ? 'Restringir avaliações' : 'Aprovar Avaliações'"
          @click="openModalValidateChangeEvaluatorApprovedStatus"
        >
          <v-icon
            :color="getCurrentEvaluator?.is_approved ? 'tertiary' : 'primary'"
          >
            {{ getCurrentEvaluator?.is_approved ? 'mdi-account-off' : 'mdi-account-check' }}
          </v-icon>
        </v-btn>
        <v-btn
          icon
          title="Editar avaliador"
          class="ml-3"
          @click="() => $router.push({ name: 'editEvaluator', query: { isEditing: true } })"
        >
          <v-icon color="primary">
            mdi-file-document-edit-outline
          </v-icon>
        </v-btn>
      </div>
    </div>
    <v-row>
      <v-col
        cols="9"
        md="12"
        sm="12"
      >
        <v-row>
          <v-col
            xl="3"
            md="4"
            sm="6"
            cols="12"
          >
            <div
              class="text-body-1 mb-3 font-weight-black"
            >
              E-mail
            </div>
            {{ getCurrentEvaluator?.email || "" }}
          </v-col>
          <v-col
            xl="3"
            md="4"
            sm="6"
            cols="12"
          >
            <div
              class="text-body-1 mb-3 font-weight-black"
            >
              Contato
            </div>
            {{ getCurrentEvaluator?.contact ? formatContact(getCurrentEvaluator.contact) : "Não cadastrado" }}
          </v-col>
          <v-col
            xl="3"
            md="4"
            sm="6"
            cols="12"
          >
            <div
              class="text-body-1 mb-3 font-weight-black"
            >
              Avaliações liberadas?
            </div>
            {{ getCurrentEvaluator?.is_approved ? "Avaliador Aprovado" : "Avaliador com restrições" }}
            <v-icon
              :color="getCurrentEvaluator?.is_approved ? 'primary' : 'tertiary'"
            >
              {{ getCurrentEvaluator?.is_approved ? 'mdi-checkbox-marked-circle-outline' : 'mdi-close-circle-outline' }}
            </v-icon>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="mt-5">
      <v-col
        md="12"
        sm="12"
      >
        <div
          class="text-body-1 mb-3 font-weight-black"
        >
          Áreas do Conhecimento
        </div>
        <v-table
          v-if="getCurrentEvaluator?.knowledge_areas?.length"
          fixed-header
          height="fit-content"
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
              v-for="(area, index) in getCurrentEvaluator?.knowledge_areas"
              :key="index"
            >
              <td
                class="text-body-2"
              >
                {{ area.prefix }}
              </td>
              <td
                class="text-body-2"
              >
                {{ area.description }}
              </td>
            </tr>
          </tbody>
        </v-table>
        <div
          v-else
          class="mb-5"
        >
          Não possui áreas do conhecimento para serem exibidas
        </div>
      </v-col>
    </v-row>
  </v-container>
  <ModalValidateChangeEvaluatorApprovedStatus
    :is-open="isModalValidateChangeEvaluatorApprovedStatusOpen"
    @close="() => isModalValidateChangeEvaluatorApprovedStatusOpen = false"
    @change="changeEvaluatorStatus()"
  />
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations } from 'vuex';
import { formatContact } from '@/modules/core/masks';

import * as evaluatorService from '@/modules/evaluator/services/evaluator.service.js';
import ModalValidateChangeEvaluatorApprovedStatus from './components/ModalValidateChangeEvaluatorApprovedStatus.vue';

export default defineComponent({
  name: 'ShowEvaluator',

  components: {
    ModalValidateChangeEvaluatorApprovedStatus
  },

  data: () => ({
    loading: false,
    isModalValidateChangeEvaluatorApprovedStatusOpen: false,
  }),

  computed: {
    ...mapGetters('permissions', [
      'getIsAdmin',
    ]),
    ...mapGetters('evaluator', [
      'getCurrentEvaluator',
      'getFetchEvaluator',
    ]),

    getPayloadEditEvaluator() {
      return {
        is_approved: !this.getCurrentEvaluator.is_approved,
        name: this.getCurrentEvaluator.name,
        email: this.getCurrentEvaluator.email,
        contact: this.getCurrentEvaluator.contact,
        document: this.getCurrentEvaluator.document,
        knowledge_areas: this.getCurrentEvaluator.knowledge_areas.map(({ id }) => id),
        change_password: false,
      }
    }
  },

  mounted() {
    this.getFetchEvaluator && this.getEvaluatorInformations();
  },

  methods: {
    ...mapMutations('evaluator', [
      'setCurrentEvaluator',
      'setFetchEvaluator',
      'setFetchEvaluatorsList',
    ]),

    formatContact,
    openModalValidateChangeEvaluatorApprovedStatus() {
      this.isModalValidateChangeEvaluatorApprovedStatusOpen = true;
    },
    changeEvaluatorStatus() {
      this.isModalValidateChangeEvaluatorApprovedStatusOpen = false;
      this.loading = true;
      const payload = this.getPayloadEditEvaluator
      evaluatorService.update({
        payload,
        uuid: this.getCurrentEvaluator.uuid
      })
        .then(() => {
          this.getEvaluatorInformations();
          this.setFetchEvaluatorsList(true);
        })
        .catch(() => {
          this.loading = false;
        })
    },
    getEvaluatorInformations() {
      this.loading = true;
      evaluatorService.fetchUser(this.getCurrentEvaluator?.uuid)
        .then(({ data }) => {
          this.setCurrentEvaluator(data)
          this.setFetchEvaluator(false)
          this.loading = false;
        }).catch(error => {
          console.error(error);
          this.$router.push({ name: 'listEvaluators' });
          return false;
        })
    },
    getKnowledgeAreasText(knowledgeAreas) {
      return knowledgeAreas
        ? knowledgeAreas.map(({ prefix }) => prefix).join(", ")
        : "---"
    }
  },
});
</script>

<style lang="scss" scoped>
td {
  cursor: pointer;
}
tr:hover {
  background-color: rgb(var(--v-theme-surface-variant), .2);
}
.inactive {
  background-color: rgb(var(--v-theme-light_gray));
  &:hover{
    background-color: rgb(var(--v-theme-light_gray), .2);
  }
}
</style>
