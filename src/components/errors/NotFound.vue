<template>
  <v-layout row pt-5 pb-5 justify-center>
    <v-flex>
      <v-card flat>

        <!--Not Found Error 404-->
        <v-card-text class="text-center">
          <h1
            style="font-size: 150px; line-height: 100%;"
            class="font-weight-thin primary--text mb-4"
          >
            404
          </h1>
          <p>
            {{ $t('errors.pageNotFound') }}.<br/>
            {{ $t('errors.tryFollowingPages') }}
          </p>
        </v-card-text>

        <!--Main page url-->
        <v-card-text>
          <v-btn
            text
            color="primary"
            :to="{ name: 'main' }"
          >
            ⟵ {{ $t('menu.main') }}
          </v-btn>
        </v-card-text>

        <!--Go back-->
        <v-card-text class="pt-0">
          <v-btn
            text
            color="primary"
            @click="goBack"
          >
            ⟵ {{ $t('content.goBack') }}
          </v-btn>
        </v-card-text>

      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'NotFound',
  methods: {
    goBack () {
      this.$router.go(-2)
    }
  }
}
</script>

<style scoped>
</style>
