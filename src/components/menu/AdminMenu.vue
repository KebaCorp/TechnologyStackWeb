<template>
  <v-card :elevation="6">
    <v-list>
      <v-list-item
        v-for="menu in adminMenus"
        :key="menu.name"
        :to="{ name: menu.name }"
      >
        {{ $t(`menu.${menu.name}`) }}
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: 'AdminMenu',
  data: () => ({
    adminMenus: [
      {
        path: '/admin/types',
        name: 'types'
      },
      {
        path: '/admin/stages',
        name: 'stages'
      },
      {
        path: '/admin/technologies',
        name: 'technologies'
      },
      {
        path: '/admin/technology-items',
        name: 'technologyItems'
      },
      {
        path: '/admin/projects',
        name: 'projects'
      }
    ]
  })
}
</script>

<style scoped>

</style>
