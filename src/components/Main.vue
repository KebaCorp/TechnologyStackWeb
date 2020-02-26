<template>
  <v-container fluid>
    <v-layout row wrap justify-center>

      <!--Empty types message-->
      <v-flex
        v-if="!Array.isArray(technologies) || !technologies.length"
        xs12 sm12 md8 lg7 xl6
      >
        <v-alert
          :value="!loading"
          type="info"
          class="mb-0"
        >
          {{ $t('type.noTypes') }}
        </v-alert>
      </v-flex>

      <!--Types-->
      <v-flex
        v-else
        xs12 sm12 md8 lg7 xl6
      >
        <v-card
          v-for="type in technologies"
          :key="type.id"
          :elevation="$vuetify.breakpoint.smAndDown ? 0 : 6"
          :flat="$vuetify.breakpoint.smAndDown"
          :class="{ 'background-none': $vuetify.breakpoint.smAndDown }"
          class="mb-5"
        >
          <v-card-title>{{ type.title }}</v-card-title>
          <v-card-text>

            <!--Empty stages message-->
            <template v-if="!Array.isArray(type.stages) || !type.stages.length">
              <v-alert
                :value="!loading"
                type="info"
                class="mb-0"
              >
                {{ $t('stage.noStages') }}
              </v-alert>
            </template>

            <!--Stages-->
            <template v-else>
              <v-layout row nowrap>

                <!--Stages-->
                <v-flex
                  v-for="stage in type.stages"
                  :key="stage.id"
                  xs12 sm6 class="lg4"
                >
                  <v-card flat>

                    <!--Empty technologies message-->
                    <template v-if="!Array.isArray(stage.technologies) || !stage.technologies.length">
                      <v-alert
                        :value="!loading"
                        type="info"
                        class="mb-0 ml-2 mr-2"
                      >
                        {{ $t('technology.noTechnologies') }}
                      </v-alert>
                    </template>

                    <!--Technologies-->
                    <template v-else>
                      <v-list>
                        <v-subheader>{{ stage.title }}</v-subheader>
                        <v-list-item-group color="primary">
                          <v-list-item
                            v-for="technology in stage.technologies"
                            :key="technology.id"
                          >
                            <v-list-item-content>
                              <v-list-item-title class="text-left" v-text="technology.title"></v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list-item-group>
                      </v-list>
                    </template>

                  </v-card>
                </v-flex>

              </v-layout>
            </template>
          </v-card-text>
        </v-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Main',
  computed: {
    ...mapGetters('dashboard', [
      'loading',
      'technologies'
    ])
  },
  created () {
    this.$store.dispatch('dashboard/getTechnologies')
  }
}
</script>

<style scoped>

</style>
