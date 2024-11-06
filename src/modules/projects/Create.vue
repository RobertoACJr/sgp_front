<template>
  <v-container
    class="create-project-container"
  >
    <div
      class="text-h6 heading-6 mb-5"
    >
      Cadastro de Projeto
    </div>
    <loading
      v-if="loading"
    />
    <v-card
      v-else
      class="mx-auto pa-12 pb-8 create-project-container__card"
      elevation="8"
      rounded="lg"
    >
      <v-row>
        <v-col
          cols="12"
          lg="6"
        >
          <v-text-field
            v-model="state.code"
            label="Código do Projeto"
            placeholder="Ex: MDIS-1"
          />
        </v-col>
        <v-col
          cols="12"
          lg="6"
        >
          <v-select
            v-model="state.teachingLevel"
            label="Nível de ensino"
            :items="teachingLevelOptions"
            :error-messages="select.errorMessage.value"
          />
        </v-col>
        <v-col
          cols="12"
          lg="6"
        >
          <v-row>
            <v-col
              cols="12"
            >
              Informações do Professor Orientador
            </v-col>
            <v-col
              v-for="(student, index) in state.studentsNames"
              :key="index"
              cols="12"
            >
              <v-text-field
                :value="student"
                v-bind="state.studentsNames[index]"
                label="Nome do estudante"
              />
              <v-btn
                v-if="index > 0"
                icon
                @click="removeStudent(index)"
              >
                <v-icon
                  color="error"
                >
                  mdi-delete-outline
                </v-icon>
              </v-btn>
            </v-col>
            <v-col
              cols="6"
              xs="12"
            >
              <v-btn
                v-if="index > 0"
                @click="removeStudent(index)"
              >
                <v-icon
                  color="error"
                >
                  mdi-plus
                </v-icon>
                Adicionar
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col
          cols="12"
        >
          <v-row>
            <v-col
              cols="12"
            >
              Informações do Professor Orientador
            </v-col>
            <v-col
              cols="6"
              xs="12"
            >
              <v-text-field
                v-model="state.advisorProfessor.name"
                label="Nome"
                :error-messages="getAdvisorProfessorNameErrors"
              />
            </v-col>
            <v-col
              cols="6"
              xs="12"
            >
              <v-text-field
                v-model="state.advisorProfessor.email"
                label="E-mail"
                :error-messages="getAdvisorProfessorEmailErrors"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col
          cols="12"
        >
          <v-row>
            <v-col
              cols="12"
            >
              Informações do Professor Co-orientador (caso haja)
            </v-col>
            <v-col
              cols="6"
              xs="12"
            >
              <v-text-field
                v-model="state.coAdvisorProfessor.name"
                label="Nome"
                :error-messages="getCoAdvisorProfessorNameErrors"
              />
            </v-col>
            <v-col
              cols="6"
              xs="12"
            >
              <v-text-field
                v-model="state.coAdvisorProfessor.email"
                label="E-mail"
                :error-messages="getCoAdvisorProfessorEmailErrors"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col
          cols="12"
          lg="6"
        >
          <v-text-field
            v-model="state.institution"
            label="Instituição"
            :error-messages="getInstitutionErrors"
          />
        </v-col>

        <v-col
          cols="6"
        >
          <v-btn
            block
            color="primary"
            size="large"
            variant="tonal"
            @click="handleSaveKnowledgeArea"
          >
            Cadastrar
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import * as knowledgeAreaService from '@/modules/knowledgeArea/services/knowledgeArea.service.js';

import { reactive } from 'vue';
import { required } from '@vuelidate/validators';

export default {
  name: 'CreateKnowledgeArea',
  setup () {
    const state = reactive({
      description: '',
      startDate: null,
      endDate: null,
    })
    const rules = {
      prefix: { required },
      description: { required },
    }

    const v$ = useVuelidate(rules, state)

    return { state, v$ }
  },
  data: () => ({
    requiredMessage: "O campo é obrigatório",
    loading: false,
    teachingLevelOptions: ['1', '2'],
  }),

  computed: {
    prefix: {
      get () {
        return this.state.prefix;
      },
      set (value) {
        this.state.prefix = `${value}`.toUpperCase();
      }
    },
    getPrefixErrors () {
      const errors = [];
      if (!this.v$.$dirty) return;
      this.v$.prefix.required.$invalid && errors.push(this.requiredMessage);
      return errors;
    },
    getDescriptionErrors () {
      const errors = [];
      if (!this.v$.$dirty) return;
      this.v$.description.required.$invalid && errors.push(this.requiredMessage);
      return errors;
    },
    getParams () {
      return {
        prefix: this.state.prefix,
        description: this.state.description,
      }
    },
  },

  methods: {
    async handleSaveKnowledgeArea() {
      this.v$.$touch()
      if (this.v$.$invalid) return;
      await this.saveProject();
    },
    async saveProject () {
      try {
        this.loading = true;
        await knowledgeAreaService.create(this.getParams);
        this.$router.push({ name: "listEvents" }) //TODO mudar para lista de projetos?
      } finally {
        this.loading = false;
      }
    }
  },
}
</script>

<style lang="scss" scoped>
</style>
