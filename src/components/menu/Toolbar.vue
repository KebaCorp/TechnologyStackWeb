<template>
  <v-app-bar
    app
    dark
    clipped-left
    color="primary"
  >

    <!--Логотип-->
    <v-toolbar-title
      @click="$router.push({ name: 'main' })"
    >
      <span class="title">{{ $t('app.name') }}</span>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <!--К тестированию-->
    <v-btn
      icon
      :to="{ name: 'admin' }"
    >
      <v-icon>mdi-account</v-icon>
    </v-btn>

  </v-app-bar>
</template>

<script>
export default {
  name: 'Toolbar'
}
</script>

<style scoped>

</style>
