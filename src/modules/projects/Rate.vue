<template>
  <loading
    v-if="loading"
  />
  <v-container v-else>
    <div
      class="text-h6 heading-6 mb-5"
    >
      {{ getCurrentProject.title }}
    </div>
    <v-form
      v-model="isFormValid"
      @submit.prevent="sendForm"
    >
      <v-row>
        <v-col
          v-for="(criterion, i) in criteria"
          :key="i"
          cols="12"
          md="12"
          sm="12"
        >
          <div
            class="text-h6 heading-6 mb-3"
          >
            {{ criterion.title }}
          </div>
          <v-row>
            <v-col
              v-for="(evaluation, j) in criterion.sub_criteria"
              :key="j"
              class="d-flex justify-end flex-column"
              cols="12"
              xl="4"
              md="6"
              sm="6"
            >
              {{ evaluation.question }}{{ evaluation.required ? " *" : "" }}
              <v-text-field
                :value="evaluation.score"
                label=""
                height="5"
                type="number"
                editable
                persistent-hint
                outline
                :rules="[
                  () => evaluation.required && !evaluation.score ? 'O campo é obrigatório' : true,
                  () => evaluation.score > 10 ? 'A nota não pode ser maior que 10' : true,
                  () => evaluation.score < 0 ? 'A nota não pode ser menor que 0' : true,
                ]"
                @update:model-value="(d) => evaluation.score = `${d}`.replace(',', '.')"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          md="12"
          sm="12"
        >
          <v-btn
            type="submit"
            block
            class="mt-8"
            color="primary"
            size="large"
            variant="tonal"
          >
            Avaliar Projeto
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
  <ModalValidateProjectCode
    :is-open="isModalVerifyCodeOpen"
    :project-code="getCurrentProject.code"
    invalid-code-msg="O código inserido está incorreto"
    title="Código de validação"
    text="Peça a um dos alunos o código para completar a avaliação"
    :handle-code-validation="rateProject"
    @close="() => isModalVerifyCodeOpen = false"
  />
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

import ModalValidateProjectCode from "@/modules/projects/components/ModalValidateProjectCode.vue";

import * as projectService from "@/modules/projects/services/projects.service";
import * as evaluationsService from "@/modules/evaluations/services/evaluations.service";

export default {
  name: 'RateProject',
  components: {
    ModalValidateProjectCode,
  },
  data: () => ({
    requiredMessage: "O campo é obrigatório",
    isModalVerifyCodeOpen: false,
    isFormValid: false,
    loading: false,
    criteria: [],
  }),

  computed: {
    ...mapGetters('projects', [
      'getCurrentProject',
    ]),
  },

  mounted() {
    this.startEvaluation();
  },

  methods: {
    ...mapMutations('projects', ['reset']),
    ...mapActions(['setToastConfig']),
    sendForm() {
      if (!this.isFormValid) return;
      this.isModalVerifyCodeOpen = true;
    },
    getMapEvaluations() {
      const evaluations = [];
      this.criteria.forEach(c => {
        c.sub_criteria.forEach(sc =>
          (sc.required || sc.score) && evaluations.push({
            sub_criterion_id: sc.id,
            score: sc.score,
          }))
      })
      return evaluations;
    },
    startEvaluation() {
      this.loading = true;
      evaluationsService.startEvaluation({
        project_code: this.getCurrentProject.code,
        project_uuid: this.getCurrentProject.uuid,
      }).then(({ data }) => {
        this.criteria = data
        this.loading = false;
      }).catch(error => {
        console.error(error);
        this.$router.push({ name: 'showProject' });
        return false;
      })
    },
    rateProject(code) {
      this.loading = true;
      this.isModalVerifyCodeOpen = false;
      return projectService.rate({
        validationCode: code,
        project_uuid: this.getCurrentProject.uuid,
        evaluations: this.getMapEvaluations(),
      }).then(async (response) => {
        this.reset();
        await this.$router.push({ name: 'listProjects' });
        this.setToastConfig({
          title: response?.message || "Avaliação salva com sucesso!!",
        });
        return true;
      }).catch(error => {
        console.error(error);
        return false;
      }).finally(() => {
        this.loading = false;
      })
    },
  },
}
</script>

<style>

</style>