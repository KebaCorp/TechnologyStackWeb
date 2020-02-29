<template>
  <v-layout row wrap justify-center pt-5>

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
              <h3 class="font-weight-light display-1 text-left">{{ $t('menu.technologies') }}</h3>
            </v-flex>

            <v-flex class="text-right">

              <!--Create-->
              <v-btn
                color="success"
                @click="toggleTechnologyCreateDialog({ value: true })"
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
              v-if="!Array.isArray(technologies) || !technologies.length"
              xs12
            >
              <v-alert
                :value="!loading"
                type="info"
                class="mb-0"
              >
                {{ $t('technology.noTechnologies') }}
              </v-alert>
            </v-flex>
            <v-flex v-else>
              <v-layout column>

                <!--Карточка записи-->
                <v-flex
                  v-for="(technology, index) in technologies"
                  :key="technology._id"
                  xs12
                  mb-3
                >
                  <v-hover v-slot:default="{ hover }">
                    <v-card :elevation="hover ? 3 : 0">
                      <v-card-title>
                        {{ index + 1 }}. {{ technology.title }}
                        <v-flex class="text-right">
                          <v-btn
                            icon
                            color="error"
                            @click="deleteTechnology(technology.id)"
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

        <!--Technology create dialog-->
        <technology-create
          v-if="technologyCreateDialog"
          :dialog="technologyCreateDialog"
          @onToggle="toggleTechnologyCreateDialog"
        />

      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'

const TechnologyCreate = () => import('./TechnologyCreate')
const AdminMenu = () => import('@/components/menu/AdminMenu')

export default {
  name: 'Technologies',
  components: {
    TechnologyCreate,
    AdminMenu
  },
  computed: {
    ...mapGetters('technologies', [
      'loading',
      'technologies'
    ])
  },
  data: () => ({
    technologyCreateDialog: false
  }),
  methods: {
    /**
     * Load technologies.
     */
    loadTechnologies () {
      this.$store.dispatch('technologies/setTechnologies')
    },

    /**
     * Toggle technology create dialog.
     *
     * @param value
     */
    toggleTechnologyCreateDialog ({ value }) {
      this.technologyCreateDialog = value
    },

    /**
     * Delete technology.
     *
     * @param id
     */
    deleteTechnology (id) {
      this.$store.dispatch('technologies/delete', { id })
        .then(() => {
          this.loadTechnologies()
        })
    }
  },
  created () {
    this.loadTechnologies()
  }
}
</script>

<style scoped>

</style>
