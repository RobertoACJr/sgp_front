<template>
  <v-container class="login-container">
    <loading
      v-if="loading"
    />
    <v-card
      v-else
      class="mx-auto pa-6 pb-8 login-container__card"
      elevation="8"
      max-width="448"
      width="100%"
      rounded="lg"
    >
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
        @click:append-inner="showPassword = !showPassword"
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
        color="primary"
        size="large"
        variant="tonal"
        @click="login"
      >
        Log In
      </v-btn>
      <button
        class="text-blue text-decoration-none text-start"
        href="#"
        rel="noopener noreferrer"
        @click="openModalForgottenPasswordGetToken"
      >
        esqueceu a senha?
      </button>
    </v-card>
    <button
      v-if="!loading"
      class="text-blue text-decoration-none text-center mt-2"
      href="#"
      rel="noopener noreferrer"
      @click="goToSignUp"
    >
      Cadastre-se agora
      <v-icon icon="mdi-chevron-right" />
    </button>
    <ModalForgottenPasswordGetToken
      v-if="isModalForgottenPasswordGetTokenOpen"
      :is-open="isModalForgottenPasswordGetTokenOpen"
      @user-with-token="openModalForgottenPasswordSendToken"
      @close="closeModalForgottenPasswordGetToken"
    />
    <ModalForgottenPasswordSendToken
      v-if="isModalForgottenPasswordSendTokenOpen"
      :is-open="isModalForgottenPasswordSendTokenOpen"
      @user-without-token="openModalForgottenPasswordGetToken"
      @close="closeModalForgottenPasswordSendToken"
    />
  </v-container>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import * as authService from '@/modules/auth/services/auth.service.js';

import { reactive } from 'vue';
import { required, email, minLength } from '@vuelidate/validators';
import { mapMutations } from 'vuex';
import ModalForgottenPasswordGetToken from './ModalForgottenPasswordGetToken.vue';
import ModalForgottenPasswordSendToken from './ModalForgottenPasswordSendToken.vue';

export default {
  name: 'LoginView',
  components: {
    ModalForgottenPasswordGetToken,
    ModalForgottenPasswordSendToken
  },
  setup () {
    const state = reactive({
      email: '',
      password: '',
    })
    const rules = {
      email: { required, email },
      password: { required, min: minLength(4) },
    }

    const v$ = useVuelidate(rules, state)

    return { state, v$ }
  },
  data: () => ({
    requiredMessage: "O campo é obrigatório",
    minMessage: "O campo deve ter no mínimo 4 caracteres",
    emailMessage: "O E-mail inserido é inválido",
    loading: false,
    showPassword: false,
    isModalForgottenPasswordGetTokenOpen: false,
    isModalForgottenPasswordSendTokenOpen: false,
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
    ...mapMutations("auth", [
      "setToken",
    ]),
    ...mapMutations("permissions", [
      "setPermissions",
      "setRole"
    ]),
    ...mapMutations("events", {
      resetEvents: "reset"
    }),
    login() {
      this.v$.$touch()
      if (this.v$.$invalid) return;
      this.loading = true;

      authService.login({
        email: this.state.email,
        password: this.state.password,
      })
        .then(({ data }) => {
          this.setToken(data?.authorization?.token || '');
          this.setPermissions(data?.user?.permissions)
          this.setRole(data?.user?.role)
          this.resetEvents()
          this.$router.push({ name: 'listEvents' });
        })
        .catch(() => {
          this.loading = false;
        })
    },
    goToSignUp() {
      this.$router.push({ name: 'signUp' })
    },
    goToForgetPassword() {
      this.$router.push({ name: 'recoverPassword' })
    },
    openModalForgottenPasswordSendToken() {
      this.closeModalForgottenPasswordGetToken()
      this.isModalForgottenPasswordSendTokenOpen = true
    },
    openModalForgottenPasswordGetToken() {
      this.closeModalForgottenPasswordSendToken()
      this.isModalForgottenPasswordGetTokenOpen = true
    },
    closeModalForgottenPasswordSendToken () {
      this.isModalForgottenPasswordSendTokenOpen = false
    },
    closeModalForgottenPasswordGetToken () {
      this.isModalForgottenPasswordGetTokenOpen = false
    },
  },
}
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  justify-content: center;

  &__card {
    display: flex;
    gap: 16px;
    flex-direction: column;
  }
}
</style>
