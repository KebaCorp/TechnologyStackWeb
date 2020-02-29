<template>
  <v-layout row wrap justify-center pt-5 pb-5>

    <!--Admin menu-->
    <v-flex
      xs12 sm12 md8 lg2 xl10
      :mr-5="$vuetify.breakpoint.lgAndUp"
      :mb-5="$vuetify.breakpoint.mdAndDown"
    >
      <admin-menu/>
    </v-flex>

    <!--Content-->
    <v-flex xs12 sm12 md8 lg9 xl10>
      <v-card
        sm12 md6
        :elevation="$vuetify.breakpoint.smAndDown ? 0 : 6"
        :flat="$vuetify.breakpoint.smAndDown"
        :class="{ 'background-none': $vuetify.breakpoint.smAndDown }"
      >
        <v-card-title>
          <v-layout wrap>

            <!--Title-->
            <v-flex>
              <h3 class="font-weight-light display-1 text-left">{{ $t('menu.stages') }}</h3>
            </v-flex>

            <v-flex class="text-right">

              <!--Create-->
              <v-btn
                color="success"
                @click="toggleStageCreateDialog({ value: true })"
              >
                <v-icon left dark>mdi-plus</v-icon>
                {{ $t('content.create') }}
              </v-btn>

            </v-flex>

          </v-layout>
        </v-card-title>

        <v-divider/>

        <v-card-text>
          <v-layout>

            <!--Сообщение, если нет записей-->
            <v-flex
              v-if="!Array.isArray(stages) || !stages.length"
              xs12
            >
              <v-alert
                :value="!loading"
                type="info"
                class="mb-0"
              >
                {{ $t('stage.noStages') }}
              </v-alert>
            </v-flex>
            <v-flex v-else>
              <v-layout column>

                <!--Карточка записи-->
                <v-flex
                  v-for="(stage, index) in stages"
                  :key="stage._id"
                  xs12
                  mb-3
                >
                  <v-hover v-slot:default="{ hover }">
                    <v-card :elevation="hover ? 3 : 0">
                      <v-card-title>
                        {{ index + 1 }}. {{ stage.title }}
                        <v-flex class="text-right">
                          <v-btn
                            icon
                            color="error"
                            @click="deleteStage(stage.id)"
                          >
                            <v-icon>mdi-delete</v-icon>
                          </v-btn>
                        </v-flex>
                      </v-card-title>
                    </v-card>
                  </v-hover>
                </v-flex>

              </v-layout>
            </v-flex>

          </v-layout>
        </v-card-text>

        <!--Loading-->
        <v-progress-linear v-if="loading" :indeterminate="true"/>

        <!--Stage create dialog-->
        <stage-create
          v-if="stageCreateDialog"
          :dialog="stageCreateDialog"
          @onToggle="toggleStageCreateDialog"
        />

      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'

const StageCreate = () => import('./StageCreate')
const AdminMenu = () => import('@/components/menu/AdminMenu')

export default {
  name: 'Stages',
  components: {
    StageCreate,
    AdminMenu
  },
  computed: {
    ...mapGetters('stages', [
      'loading',
      'stages'
    ])
  },
  data: () => ({
    stageCreateDialog: false
  }),
  methods: {
    /**
     * Load stages.
     */
    loadStages () {
      this.$store.dispatch('stages/setStages')
    },

    /**
     * Toggle stage create dialog.
     *
     * @param value
     */
    toggleStageCreateDialog ({ value }) {
      this.stageCreateDialog = value
    },

    /**
     * Delete stage.
     *
     * @param id
     */
    deleteStage (id) {
      this.$store.dispatch('stages/delete', { id })
        .then(() => {
          this.loadStages()
        })
    }
  },
  created () {
    this.loadStages()
  }
}
</script>

<style scoped>

</style>
