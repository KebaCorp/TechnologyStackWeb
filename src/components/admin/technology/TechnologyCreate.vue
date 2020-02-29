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
                  :rules="typeRules"
                  :label="$t('type.type')"
                  item-text="title"
                  item-value="id"
                />

                <!--Stages-->
                <v-select
                  v-model="stageId"
                  :items="stages"
                  :rules="stageRules"
                  :label="$t('stage.stage')"
                  item-text="title"
                  item-value="id"
                />

                <!--Изменение изображения-->
                <v-flex pt-4 pb-4>
                  <h4 class="text-left mb-2 font-weight-thin">{{ $t('content.image') }}:</h4>
                  <v-hover>
                    <v-img
                      slot-scope="{ hover }"
                      height="200px"
                      width="200px"
                      :src="image || $t('app.defaultImage')"
                      :alt="$t('content.image')"
                    >
                      <v-expand-transition>
                        <div
                          v-if="hover"
                          class="d-flex transition-fast-in-fast-out grey darken-2 v-card--reveal display-2 white--text"
                          style="height: 27%;"
                        >
                          <v-flex xs12 sm12>

                            <!--Change image-->
                            <v-btn
                              dark
                              icon
                              @click="showImageUpload = !showImageUpload"
                              :title="$t('content.changeImage')"
                            >
                              <v-icon>mdi-pencil</v-icon>
                            </v-btn>

                            <!--Delete image-->
                            <v-btn
                              dark
                              icon
                              @click="image = ''"
                              :title="$t('content.deleteImage')"
                            >
                              <v-icon>mdi-delete</v-icon>
                            </v-btn>

                          </v-flex>
                        </div>
                      </v-expand-transition>
                    </v-img>
                  </v-hover>
                  <image-crop-upload
                    v-if="showImageUpload"
                    field="img"
                    @crop-success="setImage"
                    v-model="showImageUpload"
                    :width="300"
                    :height="300"
                    :lang-ext="$t('imageCropUpload')"
                    img-format="jpg"
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

const ImageCropUpload = () => import('vue-image-crop-upload')

export default {
  name: 'TechnologyCreate',
  components: {
    ImageCropUpload
  },
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
    },
    typeRules () {
      return [
        v => !!v || this.$t('validate.required')
      ]
    },
    stageRules () {
      return [
        v => !!v || this.$t('validate.required')
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
    showImageUpload: false,
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
    },

    /**
     * Изменение изображения.
     *
     * @param image
     */
    setImage (image) {
      this.image = image
      this.showImageUpload = false
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
