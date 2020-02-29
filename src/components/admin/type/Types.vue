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
              <h3 class="font-weight-light display-1 text-left">{{ $t('menu.types') }}</h3>
            </v-flex>

            <v-flex class="text-right">

              <!--Create-->
              <v-btn
                color="success"
                @click="toggleTypeCreateDialog({ value: true })"
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
              v-if="!Array.isArray(types) || !types.length"
              xs12
            >
              <v-alert
                :value="!loading"
                type="info"
                class="mb-0"
              >
                {{ $t('type.noTypes') }}
              </v-alert>
            </v-flex>
            <v-flex v-else>
              <v-layout column>

                <!--Карточка записи-->
                <v-flex
                  v-for="(type, index) in types"
                  :key="type._id"
                  xs12
                  mb-3
                >
                  <v-hover v-slot:default="{ hover }">
                    <v-card :elevation="hover ? 3 : 0">
                      <v-card-title>
                        {{ index + 1 }}. {{ type.title }}
                        <v-flex class="text-right">
                          <v-btn
                            icon
                            color="error"
                            @click="deleteType(type.id)"
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

        <!--Type create dialog-->
        <type-create
          v-if="typeCreateDialog"
          :dialog="typeCreateDialog"
          @onToggle="toggleTypeCreateDialog"
        />

      </v-card>
    </v-flex>

  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'

const TypeCreate = () => import('./TypeCreate')
const AdminMenu = () => import('@/components/menu/AdminMenu')

export default {
  name: 'Types',
  components: {
    AdminMenu,
    TypeCreate
  },
  computed: {
    ...mapGetters('types', [
      'loading',
      'types'
    ])
  },
  data: () => ({
    typeCreateDialog: false
  }),
  methods: {
    /**
     * Load types.
     */
    loadTypes () {
      this.$store.dispatch('types/setTypes')
    },

    /**
     * Toggle type create dialog.
     *
     * @param value
     */
    toggleTypeCreateDialog ({ value }) {
      this.typeCreateDialog = value
    },

    /**
     * Delete type.
     *
     * @param id
     */
    deleteType (id) {
      this.$store.dispatch('types/delete', { id })
        .then(() => {
          this.loadTypes()
        })
    }
  },
  created () {
    this.loadTypes()
  }
}
</script>

<style scoped>

</style>
