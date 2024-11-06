<template>
  <div class="text-center pa-4">
    <loading
      v-if="loading"
    />
    <v-dialog
      v-model="shouldShowChangePassword"
      max-width="400"
      persistent
    >
      <v-card
        prepend-icon="mdi-account-key"
        title="Alterar senha"
      >
        <v-card-text>
          <v-row>
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
          </v-row>
        </v-card-text>
        <template #actions>
          <v-spacer />
          <v-btn @click="handleChangePassword">
            Salvar
          </v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
// import * as authService from '@/modules/auth/services/auth.service.js';

import { mapMutations, mapGetters } from 'vuex';
import { reactive } from 'vue';
import { required, minLength, sameAs } from '@vuelidate/validators';

export default {
  name: "ModalChangePassword",
  setup () {
    const state = reactive({
      password: '',
      verifyPassword: '',
    })
    const rules = {
      password: {
        required,
        min: minLength(6)
      },
      verifyPassword: {
        required,
        sameAs: sameAs(state.password)
      },
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
    ...mapGetters("auth", [
      "getUserIsUsingTemporaryPassword"
    ]),
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
    shouldShowChangePassword: {
      get () {
        return this.getUserIsUsingTemporaryPassword;
      },
      set (value) {
        this.setUserIsUsingTemporaryPassword(value)
      }
    },
    getPasswordErrors () {
      const errors = [];
      if (!this.v$.$dirty) return;
      this.v$.password.required.$invalid && errors.push(this.requiredMessage);
      this.v$.password.min.$invalid && errors.push("Senha muito pitica");
      return errors;
    },
    getVerifyPasswordErrors () {
      const errors = [];
      if (!this.v$.$dirty) return;
      this.v$.verifyPassword.required.$invalid && errors.push(this.requiredMessage);
      this.v$.verifyPassword.sameAs.$invalid && errors.push("As senhas não coincidem");
      return errors;
    },
    getParams() {
      return {
        password: this.password,
      }
    },
  },

  methods: {
    ...mapMutations("auth", [
      "setUserIsUsingTemporaryPassword"
    ]),
    async handleChangePassword () {
      this.v$.$touch()
      if (this.v$.$invalid) return;
      await this.changePassword();
    },
    async changePassword () {
      try {
        this.loading = true;
        // await authService.changePassword(this.getParams);
        this.$router.push({ name: "listEvents" })
      } finally {
        this.loading = false;
      }
    },
  },
}
</script>
