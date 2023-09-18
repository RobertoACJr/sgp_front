<template>
  <loading v-if="loading" />
  <v-container v-else>
    <div
      class="text-h6 heading-6 mb-5"
    >
      {{ getCurrentProject.title }}
    </div>
    <v-row>
      <v-col
        cols="9"
        :md="showAverage ? 10 : 12"
        :sm="showAverage ? 10 : 12"
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
              Orientador
            </div>
            {{ getCurrentProject?.advisor_professor || "" }}
          </v-col>
          <v-col
            v-if="getCurrentProject?.co_advisor_professor"
            xl="3"
            md="4"
            sm="6"
            cols="12"
          >
            <div
              class="text-body-1 mb-3 font-weight-black"
            >
              Co-orientador
            </div>
            {{ getCurrentProject?.co_advisor_professor || "" }}
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
              Alunos
            </div>
            <p
              v-for="(name, index) in getCurrentProject?.students_name"
              :key="index"
            >
              {{ name }}
            </p>
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
              Área
            </div>
            {{ getCurrentProject?.knowledge_area || "" }}
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
              Categoria
            </div>
            {{ getCurrentProject?.category || "" }}
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
              Nível
            </div>
            {{ getCurrentProject?.teaching_level || "" }}
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
              Instituição
            </div>
            {{ getCurrentProject?.institution || "" }}
          </v-col>
        </v-row>
      </v-col>
      <v-col
        v-if="showAverage"
        class="d-flex align-center flex-column"
        cols="3"
        md="2"
        sm="2"
      >
        <div
          class="text-body-1 mb-3 font-weight-black"
        >
          Média
        </div>
        <v-progress-circular
          v-model="getProgressValue"
          class="mb-3"
          :size="100"
          :width="10"
          :color="getProgressColor"
        >
          {{ getCurrentProject?.average }}
        </v-progress-circular>
        <p>avaliações: {{ getCurrentProject.evaluations.length || "não avaliado" }}</p>
      </v-col>
    </v-row>
    <v-row v-if="getIsAdmin">
      <v-col
        md="12"
        sm="12"
      >
        <div
          class="text-body-1 mb-3 font-weight-black"
        >
          Avaliações
        </div>
        <v-table
          v-if="getCurrentProject?.evaluations?.length"
          fixed-header
          height="fit-content"
        >
          <thead>
            <tr>
              <th class="text-left">
                Nome do Avaliador
              </th>
              <th class="text-left">
                Nota
              </th>
              <th class="text-left">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(evaluation, index) in getCurrentProject.evaluations"
              :key="index"
              :class="{'inactive': !evaluation.active}"
              @click="goToEvaluation(index)"
            >
              <td class="text-body-2">
                {{ evaluation.created_by }}
              </td>
              <td class="text-body-2">
                {{ evaluation.average }}
              </td>
              <td>
                <v-btn
                  icon
                  :color="evaluation.active ? 'tertiary' : 'primary'"
                  :title="evaluation.active ? 'Desativar Avaliação' : 'Ativar Avaliação'"
                  variant="tonal"
                >
                  <v-icon
                    :color="evaluation.active ? 'tertiary' : 'primary'"
                  >
                    {{ evaluation.active ? 'mdi-close-circle-outline' : 'mdi-checkbox-marked-circle-outline' }}
                  </v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
        <div
          v-else
          class="mb-5"
        >
          Ainda não avaliado
        </div>
      </v-col>
    </v-row>
    <v-btn 
      block
      class="mt-8"
      color="tertiary"
      size="large"
      variant="tonal"
      @click="validateProjectCode"
    >
      Avaliar Projeto
    </v-btn>
  </v-container>
  <ModalValidateProjectCode
    :is-open="isModalValidateCodeOpen"
    :project-code="getCurrentProject.code"
    @is-valid="rateProject"
    @close="() => isModalValidateCodeOpen = false"
  />
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations } from 'vuex';

import ModalValidateProjectCode from "@/modules/projects/components/ModalValidateProjectCode.vue";

import * as projectService from "@/modules/projects/services/projects.service";

export default defineComponent({
  name: 'ShowProject',
  components: {
    ModalValidateProjectCode,
  },
  data: () => ({
    loading: false,
    isModalValidateCodeOpen: false,
  }),
  computed: {
    ...mapGetters('permissions', [
      'getIsAdmin',
    ]),
    ...mapGetters('projects', [
      'getCurrentProject',
    ]),
    getProgressColor() {
      if (this.getCurrentProject.average < 6) return 'tertiary';
      else if (this.getCurrentProject.average < 8) return 'warning';
      return 'success';
    },
    getProgressValue() {
      return parseInt(this.getCurrentProject?.average) * 10;
    },
    showAverage() {
      return this.getIsAdmin && this.getCurrentProject?.evaluations && this.getCurrentProject?.evaluations?.length;
    }
  },
  mounted() {
    this.getIsAdmin && this.getProjectInformations();
  },
  methods: {
    ...mapMutations('projects', ['setCurrentProject']),
    validateProjectCode() {
      this.isModalValidateCodeOpen = true;
    },
    rateProject() {
      this.$router.push({ name: "rateProject" })
    },
    goToEvaluation(index) {
      this.$router.push({ name: "showEvaluation", params: { evaluationIndex: index }});
    },
    getProjectInformations() {
      this.loading = true;
      projectService.show(this.getCurrentProject.uuid)
        .then(({ data }) => {
          this.setCurrentProject(data)
          this.loading = false;
        }).catch(error => {
          console.error(error);
          this.$router.push({ name: 'listProjects' });
          return false;
        })
    },
  },
});
</script>

<style lang="scss" scoped>
.inactive {
  background-color: rgb(var(--v-theme-light_gray));
}
</style>
