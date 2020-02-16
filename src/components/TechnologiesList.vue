<template>
  <v-card
    class="mx-auto"
    max-width="400"
    tile
  >
    <v-card-title>
      {{ technologyType.Title }}
    </v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item-group color="primary">
          <v-list-item
            v-for="(technology, i) in technologies"
            :key="i"
          >
            <v-list-item-content>
              <v-list-item-title v-text="technology.Title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'TechnologiesList',
  props: {
    technologyType: { type: Object, default: () => ({}) },
    technologies: { type: Array, default: () => ([]) }
  }
}
</script>

<style scoped>

</style>
