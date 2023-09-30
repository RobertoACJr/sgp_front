<template>
  <v-dialog
    v-model="isDialogOpen"
    persistent
    width="auto"
  >
    <v-card>
      <v-card-text>
        Deseja realmente <strong>{{ isActive ? " Desativar " : "Ativar" }}</strong> essa avaliação
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          :color="isActive ? 'tertiary' : 'primary'"
          variant="tonal"
          @click="() => { $emit('change'); }"
        >
          {{ isActive ? " Desativar " : "Ativar" }}
        </v-btn>
        <v-btn
          color="secondary"
          variant="tonal"
          @click="isDialogOpen = false"
        >
          Cancelar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "ModalValidateChangeEvaluationStatus",
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    "close",
    "change",
  ],
  computed: {
    ...mapGetters('projects', [
      'getCurrentEvaluation',
    ]),
    isDialogOpen: {
      get() {
        return this.isOpen;
      },
      set() {
        this.$emit("close");
      }
    },
    isActive() {
      return Boolean(this.getCurrentEvaluation?.active)
    }
  },
}
</script>

<style lang="scss" scoped>
.v-card-title {
  white-space: wrap;
}
</style>