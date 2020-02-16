<template>
  <v-row
    align="center"
    justify="center"
  >
    <v-col
      v-for="Type in technologies"
      :key="Type.ID"
    >
      <v-card
        :elevation="15"
      >
        <v-card-title>
          {{ Type.Title }}
        </v-card-title>

        <!--Stages-->
        <v-card-text
          v-for="Stage in Type.Stages"
          :key="Stage.ID"
        >

          <!--Technologies-->
          <v-list>
            <v-subheader>{{ Stage.Title }}</v-subheader>
            <v-list-item-group color="primary">
              <v-list-item
                v-for="Technology in Stage.Technologies"
                :key="Technology.ID"
              >
                <v-list-item-content>
                  <v-list-item-title class="text-left" v-text="Technology.Title"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>

        </v-card-text>

      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Main',
  computed: {
    ...mapGetters('technologies', [
      'technologies'
    ])
  },
  created () {
    this.$store.dispatch('technologies/getTechnologies')
  }
}
</script>

<style scoped>

</style>
