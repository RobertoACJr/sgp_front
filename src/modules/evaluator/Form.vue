<template>
  <v-container
    class="create-evaluator-container"
  >
    <div
      class="text-h6 heading-6 mb-5"
    >
      {{ isEditing ? "Editando Avaliador" : "Cadastro de Avaliador" }}
    </div>
    <loading
      v-if="loading"
      :text="loadingText"
    />
    <v-card
      v-else
      class="mx-auto pa-6 pb-8 create-evaluator-container__card"
      elevation="8"
      rounded="lg"
    >
      <v-row>
        <v-col
          cols="12"
          lg="6"
        >
          <v-text-field
            v-model="name"
            label="Nome do Avaliador"
            placeholder="Ex: Fulano da Silva"
            :error-messages="getNameErrors"
          />
        </v-col>

        <v-col
          cols="12"
          lg="6"
        >
          <v-text-field
            v-model="email"
            label="E-mail"
            :error-messages="getEmailErrors"
          />
        </v-col>

        <v-col
          cols="12"
          lg="6"
        >
          <v-text-field
            v-model="contact"
            label="Telefone para contato"
            placeholder="(XX) XXXXX-XXXX"
            name="phone"
            maxlength="15"
            :error-messages="getContactErrors"
          />
        </v-col>

        <v-col
          cols="12"
          lg="6"
        >
          <v-text-field
            v-model="document"
            label="CPF"
            placeholder="XXX.XXX.XXX-XX"
            name="document"
            maxlength="14"
            :error-messages="getDocumentErrors"
          />
        </v-col>

        <v-col
          cols="12"
          lg="6"
        >
          <v-select
            v-model="knowledgeArea"
            :menu-props="{ width: '250' }"
            :items="getKnowledgeAreasOptions"
            label="Áreas do Conhecimento"
            placeholder="Escolha ao menos uma área"
            chips
            multiple
            return-object
            :error-messages="getKnowledgeAreaErrors"
          />
        </v-col>

        <v-col
          v-if="isEditing"
          cols="6"
          lg="3"
        >
          <v-checkbox
            v-model="state.resetPassword"
            color="primary"
            label="Resetar senha"
          />
        </v-col>

        <v-col
          v-if="isEditing"
          cols="6"
          lg="3"
        >
          <v-checkbox
            v-model="state.isApproved"
            color="primary"
            label="Usuário aprovado"
          />
        </v-col>
      </v-row>

      <v-row>
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
            @click="handleSaveEvaluator"
          >
            {{ isEditing ? "Salvar" : "Cadastrar" }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import * as evaluatorService from '@/modules/evaluator/services/evaluator.service.js';

import { reactive } from 'vue';
import { required, email } from '@vuelidate/validators';
import { validateCpf, validateFullName } from '@/modules/core/validations';
import { formatCpf, formatContact } from '@/modules/core/masks';
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'CreateEvaluator',

  props: {
    isEditing: {
      type: Boolean,
      default: false,
    }
  },

  setup () {
    const state = reactive({
      name: '',
      email: '',
      contact: '',
      document: '',
      resetPassword: false,
      isApproved: false,
      knowledgeArea: []
    })
    const rules = {
      name: {
        required,
        fullName: (value) => validateFullName(value)
      },
      email: { required, email },
      contact: {
        required,
        length: (value) => value && value.length >= 14
      },
      document: {
        required,
        isValidCpf: (value) => validateCpf(value)
      },
      knowledgeArea: { required },
    }

    const v$ = useVuelidate(rules, state)

    return { state, v$ }
  },

  data: () => ({
    requiredMessage: "O campo é obrigatório 😿",
    loading: false,
    loadingText: "",
  }),

  computed: {
    ...mapGetters('knowledgeArea', [
      'getKnowledgeAreasOptions'
    ]),
    ...mapGetters('evaluator', [
      'getCurrentEvaluator',
    ]),

    name: {
      get () {
        return this.state.name
      },
      set (value) {
        this.state.name = value
      }
    },
    email: {
      get () {
        return this.state.email
      },
      set (value) {
        this.state.email = value
      }
    },
    contact: {
      get () {
        return this.state.contact
      },
      set (value) {
        if (value.length > 14) return
        this.state.contact = formatContact(value)
      }
    },
    document: {
      get () {
        return this.state.document;
      },
      set (value) {
        if (value.length > 14) return
        this.state.document = formatCpf(value)
      }
    },
    knowledgeArea: {
      get () {
        return this.state.knowledgeArea;
      },
      set (value) {
        this.state.knowledgeArea = value
      }
    },
    getNameErrors () {
      const errors = [];
      if (!this.v$.$dirty) return;
      this.v$.name.required.$invalid && errors.push(this.requiredMessage);
      this.v$.name.fullName.$invalid && errors.push('Preencha com nome e sobrenome');
      return errors;
    },
    getEmailErrors () {
      const errors = [];
      if (!this.v$.$dirty) return;
      this.v$.email.required.$invalid && errors.push(this.requiredMessage);
      this.v$.email.email.$invalid && errors.push('E-mail inválido');
      return errors;
    },
    getContactErrors () {
      const errors = [];
      if (!this.v$.$dirty) return;
      this.v$.contact.required.$invalid && errors.push(this.requiredMessage);
      this.v$.contact.length.$invalid && errors.push('Telefone inválido');
      return errors;
    },
    getDocumentErrors () {
      const errors = [];
      if (!this.v$.$dirty) return;
      this.v$.document.required.$invalid && errors.push(this.requiredMessage);
      this.v$.document.isValidCpf.$invalid && errors.push("Cpf inválido 😿");
      return errors;
    },
    getKnowledgeAreaErrors () {
      const errors = [];
      if (!this.v$.$dirty) return;
      this.v$.knowledgeArea.required.$invalid && errors.push(this.requiredMessage);
      return errors;
    },
    getParams () {
      return {
        name: this.name,
        email: this.email,
        contact: this.contact,
        document: this.document,
        knowledge_areas: this.knowledgeArea.map(({ value }) => { return value }),
        ...(this.isEditing
          ? {
            change_password: this.state.resetPassword,
            is_approved: this.state.isApproved
          } : {})
      }
    },
  },

  mounted() {
    this.fetchKnowledgeAreaOptionsIfNecessary()

    this.isEditing && this.setCurrentEvaluatorData()
  },

  methods: {
    ...mapActions('knowledgeArea', [
      'fetchKnowledgeAreaOptionsIfNecessary'
    ]),
    ...mapMutations('evaluator', [
      'setFetchEvaluator',
      'setCurrentEvaluator',
    ]),

    setCurrentEvaluatorData() {
      this.state.name = this.getCurrentEvaluator.name || ''
      this.state.email = this.getCurrentEvaluator.email || ''
      this.contact = this.getCurrentEvaluator.contact || ''
      this.state.document = this.getCurrentEvaluator.document || ''
      this.state.knowledgeArea = this.getCurrentEvaluator.knowledge_areas?.map(({ description, id }) => ({ title: description, value: id })) || []
      this.state.isApproved = this.getCurrentEvaluator?.is_approved || false
    },

    async handleSaveEvaluator() {
      this.v$.$touch()
      if (this.v$.$invalid) {
        return;
      }

      if (this.isEditing) {
        return await this.updateEvaluator()
      }

      await this.saveEvaluator()
    },

    async saveEvaluator() {
      try {
        this.loading = true
        this.loadingText = "Salvando avaliador..."
        await evaluatorService.create(this.getParams)
        await this.setFetchEvaluator(true)
        this.$router.push({ name: "listEvaluators" })
      } finally {
        this.loading = false;
      }
    },

    async updateEvaluator() {
      try {
        this.loading = true
        this.loadingText = "Editando avaliador..."
        const { data } = await evaluatorService.update(this.getCurrentEvaluator.uuid, this.getParams)
        this.setCurrentEvaluator(data)
        this.$router.push({ name: "showEvaluator" })
      } finally {
        this.loading = false;
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
