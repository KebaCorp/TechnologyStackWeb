<template>
  <v-layout row justify-center>
    <v-dialog v-model="innerDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark fixed color="primary">

          <!--Editor close button-->
          <v-btn icon dark @click="innerDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>

          <!--Title-->
          <v-toolbar-title>
            {{ $t('technology.creating') }}
          </v-toolbar-title>

        </v-toolbar>

        <v-form v-model="valid">
          <v-container>
            <v-row>
              <v-col>

                <!--Title-->
                <v-text-field
                  v-model="title"
                  :rules="titleRules"
                  :counter="255"
                  :label="$t('technology.title')"
                  required
                  autofocus
                />

                <!--Types-->
                <v-select
                  v-model="typeId"
                  :items="types"
                  :label="$t('type.type')"
                  item-text="title"
                  item-value="id"
                />

                <!--Stages-->
                <v-select
                  v-model="stageId"
                  :items="stages"
                  :label="$t('stage.stage')"
                  item-text="title"
                  item-value="id"
                />

                <!--Save-->
                <v-btn
                  :disabled="!valid || loading"
                  type="submit"
                  block
                  :loading="loading"
                  color="success"
                  @click.prevent="create"
                  class="mt-3 mb-5"
                >
                  {{ $t('content.save') }}
                  <v-icon right>mdi-content-save-edit</v-icon>
                </v-btn>

              </v-col>
            </v-row>
          </v-container>
        </v-form>

      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TechnologyCreate',
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters('types', [
      'types'
    ]),
    ...mapGetters('stages', [
      'stages'
    ]),
    innerDialog: {
      get () {
        return this.dialog
      },
      set (value) {
        this.$emit('onToggle', { value })
      }
    },
    titleRules () {
      return [
        v => !!v || this.$t('validate.required'),
        v => v.length <= 255 || this.$t('validate.maxLength', { max: 255 })
      ]
    }
  },
  data: () => ({
    loading: false,
    valid: false,
    typeId: null,
    stageId: null,
    title: '',
    image: '',
    errors: {}
  }),
  methods: {
    /**
     * Create method.
     */
    create () {
      if (!this.valid || this.loading) return false

      this.$store.dispatch('technologies/create', {
        typeId: this.typeId,
        stageId: this.stageId,
        title: this.title,
        image: this.image
      })
        .then(() => {
          this.$emit('onCreate')

          // Success notification
          this.$store.dispatch('snackBar/toggleSnackBar', {
            value: true,
            content: this.$t('messages.successSave'),
            color: 'success'
          })
        })
        .then(() => {
          // Close dialog
          this.innerDialog = false
        })
        .then(() => {
          // Load technologies
          this.$store.dispatch('technologies/setTechnologies')
        })
        .catch(error => {
          // Error notification
          this.$store.dispatch('snackBar/toggleSnackBar', {
            value: true,
            content: error.message,
            color: 'error'
          })

          // Set server validation errors
          if (error.isValidationError) {
            this.errors = error.validationErrors
          }
        })
    }
  },
  created () {
    // Load types
    this.$store.dispatch('types/setTypes')

    // Load stages
    this.$store.dispatch('stages/setStages')
  }
}
</script>

<style scoped>

</style>
