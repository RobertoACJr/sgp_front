<template>
  <v-container class="login-container">
    <v-card
      class="mx-auto pa-12 pb-8 login-container__card"
      elevation="8"
      width="448"
      rounded="lg"
    >
      <p
        v-if="message"
        class="text-center"
      >
        {{ message }}
      </p>

      <v-text-field
        v-model="state.email"
        label="E-mail"
        :error-messages="getEmailErrors"
      />

      <v-text-field
        v-model="state.password"
        label="Senha"
        :type="showPassword ? 'text' : 'password'"
        :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :error-messages="getPasswordErrors"
        @click="showPassword = !showPassword"
      />

      <!-- <v-card
        class="mb-12"
        color="surface-variant"
        variant="tonal"
      >
        <v-card-text class="text-medium-emphasis text-caption">
          // TODO
          aqui deverá ficar o aviso para o meliante não ficar espamando o login
        </v-card-text>
      </v-card> -->

      <v-btn
        block
        class="mb-8"
        color="primary"
        size="large"
        variant="tonal"
        @click="login"
      >
        Log In
      </v-btn>

      <!-- <v-card-text class="text-center">
        <a
          class="text-blue text-decoration-none"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          // TODO: aqui ficará o redirecionamento para cadastro, ainda a implementar
          Cadastre-se agora <v-icon icon="mdi-chevron-right" />
        </a>
      </v-card-text> -->
    </v-card>
    <loading
      v-if="loading"
    />
  </v-container>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import * as authService from '@/modules/core/services/auth.service.js';

import { reactive } from 'vue';
import { required, email, minLength } from '@vuelidate/validators';

export default {
  name: 'LoginView',
  setup () {
    const state = reactive({
      email: '',
      password: '',
    })
    const rules = {
      email: { required, email },
      password: { required, min: minLength(6) },
    }

    const v$ = useVuelidate(rules, state)

    return { state, v$ }
  },
  data: () => ({
    requiredMessage: "O campo é obrigatório",
    minMessage: "O campo deve ter no mínimo 8 caracteres",
    emailMessage: "O E-mail inserido é inválido",
    message: "",
    loading: false,
    showPassword: false,
  }),

  computed: {
    getEmailErrors () {
      const errors = [];
      if (!this.v$.$dirty) return;
      this.v$.email.required.$invalid && errors.push(this.requiredMessage);
      this.v$.email.email.$invalid && errors.push(this.emailMessage);
      return errors;
    },
    getPasswordErrors () {
      const errors = [];
      if (!this.v$.$dirty) return;
      this.v$.password.required.$invalid && errors.push(this.requiredMessage);
      this.v$.password.min.$invalid && errors.push(this.minMessage);
      return errors;
    },
  },

  methods: {
    login() {
      this.message = "";
      this.loading = true;
      this.v$.$touch()
      if (this.v$.$invalid) return;

      authService.login({
        email: this.state.email,
        password: this.state.password,
      })
        .then(() => {
          this.$router.push({ name: 'listEvents' });
        })
        .catch(error => {
          this.message = error.response?.data?.message ||
            "Erro ao processar Solicitação, tente novamente";
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
}
</script>

<style lang="scss" scope>
.login-container {
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;

  &__card {
    display: flex;
    gap: 16px;
    flex-direction: column;
  }
}
</style>
