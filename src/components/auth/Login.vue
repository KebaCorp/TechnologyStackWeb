<template>
  <v-layout align-center justify-center>
    <v-flex sm12 md6 lg4 mb-5>
      <v-card
        :elevation="$vuetify.breakpoint.smAndDown ? 0 : 6"
        :flat="$vuetify.breakpoint.smAndDown"
      >

        <!--Title-->
        <v-card-title class="text-xs-left">
          <h1>{{ $t('auth.login') }}</h1>
        </v-card-title>

        <!--Login form-->
        <v-card-text class="text-xs-left pt-0">
          <login-form/>
        </v-card-text>

        <!--Loading-->
        <v-progress-linear v-if="loading" :indeterminate="true"/>

      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'

const LoginForm = () => import('@/components/auth/LoginForm')

export default {
  name: 'Login',
  components: {
    LoginForm
  },
  computed: {
    ...mapGetters('authorization', [
      'loading'
    ])
  }
}
</script>

<style scoped>

</style>
