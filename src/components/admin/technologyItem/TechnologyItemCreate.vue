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
            {{ $t('technologyItem.creating') }}
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
                  :label="$t('technologyItem.title')"
                  required
                  autofocus
                />

                <!--Types-->
                <v-select
                  v-model="technologyId"
                  :items="technologies"
                  :rules="technologyIdRules"
                  :label="$t('technology.technology')"
                  item-text="title"
                  item-value="id"
                />

                <!--Stages-->
                <v-select
                  v-model="parentId"
                  :items="technologyItems"
                  :label="$t('technologyItem.technologyItem')"
                  item-text="title"
                  item-value="id"
                />

                <!--Description editor-->
                <v-flex pt-4 pb-4>
                  <h4 class="text-left mb-2 font-weight-thin">{{ $t('content.description') }}</h4>
                  <content-editor
                    :value="description"
                    :disabled="loading"
                    @onChange="onChangeDescription"
                  />
                </v-flex>

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

const ContentEditor = () => import(/* webpackChunkName: 'ContentEditor' */ '@/components/main/ContentEditor')

export default {
  name: 'TechnologyItemCreate',
  components: {
    ContentEditor
  },
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters('technologies', [
      'technologies'
    ]),
    ...mapGetters('technologyItems', [
      'technologyItems'
    ]),
    innerDialog: {
      get () {
        return this.dialog
      },
      set (value) {
        this.$emit('onToggle', { value })
      }
    },
    technologyIdRules () {
      return [
        v => !!v || this.$t('validate.required')
      ]
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
    technologyId: null,
    parentId: 0,
    title: '',
    description: '',
    errors: {}
  }),
  methods: {
    /**
     * Create method.
     */
    create () {
      if (!this.valid || this.loading) return false

      this.$store.dispatch('technologyItems/create', {
        technologyId: this.technologyId,
        parentId: this.parentId,
        title: this.title,
        description: this.description,
        code: this.code,
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
          // Load technologyItems
          this.$store.dispatch('technologyItems/setTechnologyItems')
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
    },

    /**
     * On description changed.
     *
     * @param value
     */
    onChangeDescription ({ value }) {
      this.description = value
    }
  },
  created () {
    // Load technologies
    this.$store.dispatch('technologies/setTechnologies')
  }
}
</script>

<style scoped>

</style>
