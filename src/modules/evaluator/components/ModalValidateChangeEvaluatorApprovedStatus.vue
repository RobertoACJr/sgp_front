<template>
  <v-dialog
    v-model="isDialogOpen"
    persistent
    width="auto"
  >
    <v-card>
      <v-card-text>
        Deseja realmente <strong>{{ isActive ? " Desativar " : "Ativar" }}</strong> esse avaliador?
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
  name: "ModalValidateChangeEvaluatorApprovedStatus",
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
    ...mapGetters('evaluator', [
      'getCurrentEvaluator',
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
      return Boolean(this.getCurrentEvaluator?.is_approved)
    }
  },
}
</script>

<style lang="scss" scoped>
.v-card-title {
  white-space: wrap;
}
</style>