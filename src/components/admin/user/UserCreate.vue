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
            {{ $t('user.creating') }}
          </v-toolbar-title>

        </v-toolbar>

        <v-form v-model="valid">
          <v-container>
            <v-row>
              <v-col>

                <!--Title-->
                <v-text-field
                  v-model="username"
                  :rules="usernameRules"
                  :counter="255"
                  :label="$t('user.username') + '*'"
                  required
                  autofocus
                />

                <!--Email-->
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  :counter="255"
                  :label="$t('user.email') + '*'"
                  required
                  type="email"
                />

                <!--Password-->
                <v-text-field
                  v-model="password"
                  :rules="passwordRules"
                  :counter="255"
                  :label="$t('user.password') + '*'"
                  required
                  type="password"
                />

                <!--Retype password-->
                <v-text-field
                  v-model="retypePassword"
                  :rules="retypePasswordRules"
                  :counter="255"
                  :label="$t('user.retypePassword') + '*'"
                  required
                  type="password"
                />

                <!--First name-->
                <v-text-field
                  v-model="firstName"
                  :rules="firstNameRules"
                  :counter="255"
                  :label="$t('user.firstName')"
                />

                <!--Last name-->
                <v-text-field
                  v-model="lastName"
                  :rules="lastNameRules"
                  :counter="255"
                  :label="$t('user.lastName')"
                />

                <!--Middle name-->
                <v-text-field
                  v-model="middleName"
                  :rules="middleNameRules"
                  :counter="255"
                  :label="$t('user.middleName')"
                />

                <!--Image-->
                <v-flex pt-4 pb-4>
                  <h4 class="text-left mb-2 font-weight-thin">{{ $t('content.image') }}</h4>
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
const ImageCropUpload = () => import('vue-image-crop-upload')

export default {
  name: 'UserCreate',
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
    innerDialog: {
      get () {
        return this.dialog
      },
      set (value) {
        this.$emit('onToggle', { value })
      }
    },
    usernameRules () {
      return [
        v => !!v || this.$t('validate.required'),
        v => v.length <= 255 || this.$t('validate.maxLength', { max: 255 })
      ]
    },
    emailRules () {
      return [
        v => !!v || this.$t('validate.required'),
        v => v.length <= 255 || this.$t('validate.maxLength', { max: 255 }),
        v => /.+@.+/.test(v) || this.$t('validate.invalidEmail')
      ]
    },
    passwordRules () {
      return [
        v => !!v || this.$t('validate.required'),
        v => v.length <= 255 || this.$t('validate.maxLength', { max: 255 }),
        v => v.length >= 6 || this.$t('validate.minLength', { max: 6 })
      ]
    },
    retypePasswordRules () {
      return [
        v => !!v || this.$t('validate.required'),
        v => v.length <= 255 || this.$t('validate.maxLength', { max: 255 }),
        v => v.length >= 6 || this.$t('validate.minLength', { max: 6 }),
        v => v === this.password || this.$t('validate.notEqualsPassword')
      ]
    },
    firstNameRules () {
      return [
        v => v.length <= 255 || this.$t('validate.maxLength', { max: 255 })
      ]
    },
    lastNameRules () {
      return [
        v => v.length <= 255 || this.$t('validate.maxLength', { max: 255 })
      ]
    },
    middleNameRules () {
      return [
        v => v.length <= 255 || this.$t('validate.maxLength', { max: 255 })
      ]
    }
  },
  data: () => ({
    loading: false,
    valid: false,
    username: '',
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    password: '',
    retypePassword: '',
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

      this.$store.dispatch('users/create', {
        username: this.username,
        firstName: this.firstName,
        lastName: this.lastName,
        middleName: this.middleName,
        email: this.email,
        password: this.password,
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
          // Load users
          this.$store.dispatch('users/setUsers')
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
     * Change image.
     *
     * @param image
     */
    setImage (image) {
      this.image = image
      this.showImageUpload = false
    }
  }
}
</script>

<style scoped>

</style>
