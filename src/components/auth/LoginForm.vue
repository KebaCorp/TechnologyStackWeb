<template>
  <v-form
    @submit="login"
    :disabled="true"
  >

    <!--Login-->
    <v-text-field
      prepend-icon="mdi-account"
      name="login"
      :label="`${$t('auth.username')} *`"
      type="text"
      v-model="username"
      :error-messages="usernameErrors"
      required
      @input="$v.username.$touch()"
      @blur="$v.username.$touch()"
      :disabled="loading"
      clearable
    />

    <!--Password-->
    <v-text-field
      prepend-icon="mdi-lock"
      name="password"
      :label="`${$t('auth.password')} *`"
      type="password"
      v-model="password"
      :error-messages="passwordErrors"
      required
      @change="$v.password.$touch()"
      @blur="$v.password.$touch()"
      :disabled="loading"
      clearable
    />

    <!--Remember me-->
    <v-checkbox
      color="primary"
      v-model="rememberMe"
      :label="$t('auth.rememberMe')"
    />

    <!--Login button-->
    <v-btn
      :disabled="$v.$invalid"
      type="submit"
      block
      :loading="loading"
      color="primary"
      @click.prevent="login"
    >
      {{ $t('auth.login') }}
    </v-btn>

  </v-form>
</template>

<script>
import { mapGetters } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'LoginForm',
  computed: {
    ...mapGetters('authorization', [
      'loading',
      'isAuthorized'
    ]),
    ...mapGetters('contacts', [
      'email'
    ]),
    usernameErrors () {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      if (!this.$v.username.required) errors.push(this.$t('auth.usernameRequired'))
      if (this.errors.username) errors.push(this.errors.username)
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      if (!this.$v.password.required) errors.push(this.$t('auth.passwordRequired'))
      if (this.errors.password) errors.push(this.errors.password)
      return errors
    }
  },
  data: () => ({
    username: '',
    password: '',
    rememberMe: true,
    errors: {}
  }),
  methods: {
    /**
     * Authorization.
     */
    login () {
      this.$v.$touch()
      if (this.$v.$invalid) return false
      this.$store.dispatch('authorization/login', {
        username: this.username,
        password: this.password,
        rememberMe: this.rememberMe
      })
        .then(async () => {
          // Redirect after authorization
          await this.$router.push({ path: this.$route.query.redirect || '/' })
          return true
        })
        .then(() => {
          // Reload page
          window.location.reload()
        })
        .catch(error => {
          // Set server validation errors
          if (error.isValidationError) {
            this.errors = error.validationErrors
          }
        })
    }
  },
  mixins: [validationMixin],
  validations: {
    username: { required },
    password: { required }
  }
}
</script>

<style scoped>

</style>
