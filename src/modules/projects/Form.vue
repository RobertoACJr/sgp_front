<template>
  <v-container
    class="create-project-container"
  >
    <div
      class="text-h6 heading-6 mb-5"
    >
      {{ isEditing ? `Editando: ${getCurrentProject.title}` : 'Cadastro de Projeto' }}
    </div>
    <loading
      v-if="loading"
      :text="loadingText"
    />
    <v-card
      v-else
      class="mx-auto pa-6 pb-8 create-project-container__card"
      elevation="8"
      rounded="lg"
    >
      <v-row>
        <v-col
          cols="12"
          lg="6"
        >
          <v-text-field
            v-model="state.title"
            label="Título do Projeto"
            :error-messages="getTitleErrorMessage"
          />
        </v-col>
        <v-col
          cols="12"
          lg="6"
        >
          <v-text-field
            v-model="state.location"
            label="Localização do projeto"
            placeholder="Ex: Biblioteca"
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
            :error-messages="getTeachingLevelErrorMessage"
          />
        </v-col>
        <v-col
          cols="12"
          lg="6"
        >
          <v-select
            v-model="state.knowledgeArea"
            :menu-props="{ width: '250' }"
            :items="getKnowledgeAreasOptions"
            label="Áreas do Conhecimento"
            :error-messages="getKnowledgeAreaErrors"
          />
        </v-col>
        <v-col
          cols="12"
          lg="6"
        >
          <v-select
            v-model="state.category"
            :menu-props="{ width: '250' }"
            :items="categoryOptions"
            label="Categoria"
            :error-messages="getCategoryErrors"
          />
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
          cols="12"
        >
          <v-row>
            <v-col
              cols="12"
            >
              Informações do Professor Orientador
            </v-col>
            <v-col
              sm="6"
              cols="12"
            >
              <v-text-field
                v-model="state.advisorProfessor.name"
                label="Nome"
                :error-messages="getAdvisorProfessorNameErrors"
              />
            </v-col>
            <v-col
              sm="6"
              cols="12"
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
              sm="6"
              cols="12"
            >
              <v-text-field
                v-model="state.coAdvisorProfessor.name"
                label="Nome"
                :error-messages="getCoAdvisorProfessorNameErrors"
              />
            </v-col>
            <v-col
              sm="6"
              cols="12"
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
        >
          <v-row>
            <v-col
              cols="12"
            >
              Nomes dos estudantes
            </v-col>
            <v-col
              v-for="(student, index) in state.studentsNames"
              :key="index"
              cols="12"
              class="d-flex ga-4"
            >
              <v-text-field
                v-model="state.studentsNames[index]"
                label="Nome do estudante"
                :error-messages="getStudentErrorsByIndex(index)"
              />
              <v-btn
                icon
                title="Remover estudante"
                :disabled="state.studentsNames.length == 1"
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
              cols="12"
            >
              <v-btn
                title="Adicionar estudante"
                color="success"
                @click="() => state.studentsNames.push('')"
              >
                <v-icon
                  color="white"
                >
                  mdi-plus
                </v-icon>
                Adicionar Estudante
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row class="mt-10">
        <v-col
          cols="6"
        />
        <v-col
          cols="6"
        >
          <v-btn
            block
            color="primary"
            size="large"
            variant="tonal"
            @click="handleSaveProject"
          >
            {{ isEditing ? `Salvar` : 'Cadastrar' }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import * as projectsService from '@/modules/projects/services/projects.service.js';

import { reactive } from 'vue';
import { required } from '@vuelidate/validators';
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'CreateProject',

  props: {
    isEditing: {
      type: Boolean,
      default: false
    }
  },

  setup () {
    const state = reactive({
      title: null,
      teachingLevel: null,
      institution: null,
      knowledgeArea: null,
      category: null,
      location: null,
      studentsNames: [
        ""
      ],
      advisorProfessor: {
        name: null,
        email: null,
      },
      coAdvisorProfessor: {
        name: null,
        email: null,
      },
    })

    const rules = {
      title: { required },
      teachingLevel: { required },
      institution: { required },
      knowledgeArea: { required },
      category: { required },
      studentsNames: {
        required: (value) => value.every(v => v)
      },
      advisorProfessor: {
        name: { required },
        email: { required },
      },
      coAdvisorProfessor: {
        name: {
          required: (name, obj) => !obj.email || !!name
        },
        email: {
          required: (email, obj) => !obj.name || !!email
        },
      },
    }

    const v$ = useVuelidate(rules, state)

    return { state, v$ }
  },

  data: () => ({
    requiredMessage: "O campo é obrigatório",
    loading: false,
    loadingText: "",
    teachingLevelOptions: [
      {
        title: "Ensino Fundamental",
        value: 1,
      },
      {
        title: "Ensino Médio",
        value: 2
      }
    ],
    categoryOptions: [
      {
        title: "Pesquisa Científica",
        value: 1
      },
      {
        title: "Pesquisa Tecnológica",
        value: 2
      }
    ]
  }),

  computed: {
    ...mapGetters('knowledgeArea', [
      'getKnowledgeAreasOptions'
    ]),
    ...mapGetters("events", [
      "getCurrentEvent"
    ]),
    ...mapGetters('projects', [
      'getCurrentProject',
    ]),

    getTitleErrorMessage () {
      const errors = [];
      if (!this.v$.$dirty) return;
      this.v$.title.required.$invalid && errors.push(this.requiredMessage);
      return errors;
    },

    getTeachingLevelErrorMessage () {
      const errors = [];
      if (!this.v$.$dirty) return;
      this.v$.teachingLevel.required.$invalid && errors.push(this.requiredMessage);
      return errors;
    },

    getAdvisorProfessorNameErrors () {
      const errors = [];
      if (!this.v$.$dirty) return;
      this.v$.advisorProfessor.name.required.$invalid && errors.push(this.requiredMessage);
      return errors;
    },

    getAdvisorProfessorEmailErrors () {
      const errors = [];
      if (!this.v$.$dirty) return;
      this.v$.advisorProfessor.email.required.$invalid && errors.push(this.requiredMessage);
      return errors;
    },

    getCoAdvisorProfessorNameErrors () {
      const errors = [];
      if (!this.v$.$dirty) return;
      this.v$.coAdvisorProfessor.name.required.$invalid && errors.push(this.requiredMessage);
      return errors;
    },

    getCoAdvisorProfessorEmailErrors () {
      const errors = [];
      if (!this.v$.$dirty) return;
      this.v$.coAdvisorProfessor.email.required.$invalid && errors.push(this.requiredMessage);
      return errors;
    },

    getInstitutionErrors () {
      const errors = [];
      if (!this.v$.$dirty) return;
      this.v$.institution.required.$invalid && errors.push(this.requiredMessage);
      return errors;
    },

    getKnowledgeAreaErrors () {
      const errors = [];
      if (!this.v$.$dirty) return;
      this.v$.knowledgeArea.required.$invalid && errors.push(this.requiredMessage);
      return errors;
    },

    getCategoryErrors () {
      const errors = [];
      if (!this.v$.$dirty) return;
      this.v$.category.required.$invalid && errors.push(this.requiredMessage);
      return errors;
    },

    getHasCoAdvisorProfessor() {
      return !!this.state.coAdvisorProfessor.name && this.state.coAdvisorProfessor.email
    },

    getParams () {
      const PARAMS = {
        title: this.state.title,
        project_teaching_level_id: this.state.teachingLevel,
        institution: this.state.institution,
        students_name: this.state.studentsNames,
        advisor_professor: this.state.advisorProfessor,
        event_uuid: this.getCurrentEvent.uuid,
        knowledge_area_id: this.state.knowledgeArea,
        project_category_id: this.state.category,
        ...(this.getHasCoAdvisorProfessor ? { co_advisor_professor: this.state.coAdvisorProfessor } : {}),
        ...(this.state.location ? { location: this.state.location } : {}),
      }

      return PARAMS
    },
  },

  mounted() {
    if (this.isEditing) {
      this.handleSetProjectData()
    }
  },

  methods: {
    ...mapMutations('projects', [
      'setFetchProjectsList',
    ]),

    handleSetProjectData() {
      this.state.title = this.getCurrentProject?.title || ""
      this.state.location = this.getCurrentProject?.location || ""
      this.state.advisorProfessor.name = this.getCurrentProject?.advisor_professor?.name || ""
      this.state.advisorProfessor.email = this.getCurrentProject?.advisor_professor?.email || ""
      this.state.coAdvisorProfessor.name = this.getCurrentProject?.co_advisor_professor?.name || ""
      this.state.coAdvisorProfessor.email = this.getCurrentProject?.co_advisor_professor?.email || ""
      this.state.institution = this.getCurrentProject?.institution || ""
      this.state.studentsNames = this.getCurrentProject?.students_name || []
      this.state.knowledgeArea = this.getKnowledgeAreasOptions.find(({ title }) => title.includes(this.getCurrentProject?.knowledge_area))?.value || ""
      this.state.teachingLevel = this.teachingLevelOptions.find(({ title }) => title == this.getCurrentProject?.teaching_level || "")?.value || ""
      this.state.category = this.categoryOptions.find(({ title }) => title == this.getCurrentProject?.category || "")?.value || ""
    },

    getStudentErrorsByIndex(index) {
      const errors = [];
      if (!this.v$.$dirty) return;
      this.v$.studentsNames.required.$invalid && !this.state.studentsNames[index] && errors.push(this.requiredMessage);
      return errors;
    },

    async handleSaveProject() {
      this.v$.$touch()
      if (this.v$.$invalid) return;

      if (this.isEditing) {
        this.updateProject()
      } else {
        this.saveProject()
      }
    },

    async saveProject () {
      try {
        this.loading = true;
        this.loadingText = "Salvando projeto..."
        await projectsService.create(this.getParams)
        await this.setFetchProjectsList(true)
        this.$router.push({ name: "listProjects" })
      } finally {
        this.loading = false;
      }
    },

    async updateProject () {
      try {
        this.loading = true;
        this.loadingText = "Atualizando projeto..."
        await projectsService.update(this.getCurrentProject.uuid, this.getParams)
        await this.setFetchProjectsList(true)
        this.$router.push({ name: "listProjects" })
      } finally {
        this.loading = false;
      }
    },

    removeStudent(index) {
      this.state.studentsNames.splice(index, 1);
    }
  },
}
</script>
