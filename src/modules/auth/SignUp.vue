<template>
  <v-container
    class="create-evaluator-container"
  >
    <div
      class="text-h6 heading-6 mb-5"
    >
      Cadastro de Avaliador
    </div>
    <loading
      v-if="loading"
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
            placeholder="XX XXXXX-XXXX"
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
          v-if="getKnowledgeAreas.length"
          cols="12"
          lg="6"
        >
          <v-select
            v-model="knowledgeArea"
            :menu-props="{ width: '250' }"
            :items="getKnowledgeAreas"
            label="Áreas do Conhecimento"
            placeholder="Escolha ao menos uma área"
            multiple
            :error-messages="getKnowledgeAreaErrors"
          />
        </v-col>

        <v-col
          cols="12"
          lg="6"
        >
          <v-text-field
            v-model="password"
            label="Senha"
            :type="showPassword ? 'text' : 'password'"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :error-messages="getPasswordErrors"
            @click:append-inner="showPassword = !showPassword"
          />
        </v-col>

        <v-col
          cols="12"
          lg="6"
        >
          <v-text-field
            v-model="verifyPassword"
            label="Repetir a senha"
            :type="showVerifyPassword ? 'text' : 'password'"
            :append-inner-icon="showVerifyPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :error-messages="getVerifyPasswordErrors"
            @click:append-inner="showVerifyPassword = !showVerifyPassword"
          />
        </v-col>

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
            Cadastrar
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
    <button
      class="text-blue text-decoration-none mt-5 text-start"
      href="#"
      rel="noopener noreferrer"
      @click="goToSignIn"
    >
      Já possui cadastro? voltar para o login
    </button>
  </v-container>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import * as authService from '@/modules/auth/services/auth.service.js';

import { reactive, computed } from 'vue';
import { required, email, minLength, sameAs } from '@vuelidate/validators';
import { validateCpf, validateFullName } from '@/modules/core/validations';
import { formatCpf, formatContact } from '@/modules/core/masks';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'CreateEvaluator',
  setup () {
    const state = reactive({
      name: '',
      email: '',
      contact: '',
      document: '',
      password: '',
      verifyPassword: '',
      knowledgeArea: []
    })
    
    const password = computed(() => state.password);

    const rules = {
      name: {
        required,
        fullName: (value) => validateFullName(value)
      },
      email: { required, email },
      contact: {
        required,
        length: (value) => value && value.length == 15
      },
      document: {
        required,
        isValidCpf: validateCpf
      },
      password: {
        required,
        min: minLength(6)
      },
      verifyPassword: {
        required,
        sameAs: sameAs(password)
      },
      knowledgeArea: { required },
    }

    const v$ = useVuelidate(rules, state)

    return { state, v$ }
  },
  data: () => ({
    requiredMessage: "O campo é obrigatório 😿",
    loading: false,
    showPassword: false,
    showVerifyPassword: false,
  }),

  computed: {
    ...mapGetters('knowledgeArea', [
      'getKnowledgeAreas'
    ]),
    name: {
      get () {
        return this.state.name;
      },
      set (value) {
        this.state.name = value
      }
    },
    email: {
      get () {
        return this.state.email;
      },
      set (value) {
        this.state.email = value
      }
    },
    contact: {
      get () {
        return this.state.contact;
      },
      set (value) {
        if (value.length > 15) return
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
    password: {
      get () {
        return this.state.password;
      },
      set (value) {
        this.state.password = value
      }
    },
    verifyPassword: {
      get () {
        return this.state.verifyPassword;
      },
      set (value) {
        this.state.verifyPassword = value
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
    getPasswordErrors () {
      const errors = [];
      if (!this.v$.$dirty) return;
      this.v$.password.required.$invalid && errors.push(this.requiredMessage);
      this.v$.password.min.$invalid && errors.push("Mínimo de seis caracteres");
      return errors;
    },
    getVerifyPasswordErrors () {
      const errors = [];
      if (!this.v$.$dirty) return;
      this.v$.verifyPassword.required.$invalid && errors.push(this.requiredMessage);
      this.v$.verifyPassword.sameAs.$invalid && errors.push("As senhas não coincidem");
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
        password: this.password,
        confirm_password: this.verifyPassword,
        knowledge_areas: this.knowledgeArea,
      }
    },
  },

  mounted() {
    this.fetchKnowledgeAreaOptionsIfNecessary();
  },

  methods: {
    ...mapActions('knowledgeArea', [
      'fetchKnowledgeAreaOptionsIfNecessary'
    ]),
    async handleSaveEvaluator() {
      this.v$.$touch()
      if (this.v$.$invalid) return;
      await this.saveEvaluator();
    },
    async saveEvaluator () {
      try {
        this.loading = true;
        await authService.signUp(this.getParams);
        this.goToSignIn();
      } finally {
        this.loading = false;
      }
    },
    goToSignIn() {
      this.$router.push({ name: 'login' })
    }
  },
}
</script>

<style lang="scss" scoped>
.create-evaluator-container {
  display: flex;
  margin: auto;
  min-height: 100%;
  flex-direction: column;
  justify-content: center;
  width: fit-content;
}
</style>
