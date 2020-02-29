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
              <h3 class="font-weight-light display-1 text-left">{{ $t('menu.projects') }}</h3>
            </v-flex>

            <v-flex class="text-right">

              <!--Create-->
              <v-btn
                color="success"
                @click="toggleProjectCreateDialog({ value: true })"
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
              v-if="!Array.isArray(projects) || !projects.length"
              xs12
            >
              <v-alert
                :value="!loading"
                type="info"
                class="mb-0"
              >
                {{ $t('project.noProjects') }}
              </v-alert>
            </v-flex>
            <v-flex v-else>
              <v-layout column>

                <!--Карточка записи-->
                <v-flex
                  v-for="project in projects"
                  :key="project._id"
                  xs12
                  mb-3
                >
                  <v-hover v-slot:default="{ hover }">
                    <v-card :elevation="hover ? 3 : 0">
                      <v-card-title>
                        <img
                          :src="project.image || $t('app.defaultImage')"
                          :height="50"
                          :width="50"
                        />
                        <v-flex class="text-left pl-5">
                          {{ project.title }}
                          <span class="ml-1 grey--text">({{ project.code }})</span>
                        </v-flex>
                        <v-flex class="text-right">
                          <v-btn
                            icon
                            color="error"
                            @click="deleteProject(project.id)"
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

        <!--Project create dialog-->
        <project-create
          v-if="projectCreateDialog"
          :dialog="projectCreateDialog"
          @onToggle="toggleProjectCreateDialog"
        />

      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'

const ProjectCreate = () => import('./ProjectCreate')
const AdminMenu = () => import('@/components/menu/AdminMenu')

export default {
  name: 'Projects',
  components: {
    ProjectCreate,
    AdminMenu
  },
  computed: {
    ...mapGetters('projects', [
      'loading',
      'projects'
    ])
  },
  data: () => ({
    projectCreateDialog: false
  }),
  methods: {
    /**
     * Load projects.
     */
    loadProjects () {
      this.$store.dispatch('projects/setProjects')
    },

    /**
     * Toggle project create dialog.
     *
     * @param value
     */
    toggleProjectCreateDialog ({ value }) {
      this.projectCreateDialog = value
    },

    /**
     * Delete project.
     *
     * @param id
     */
    deleteProject (id) {
      this.$store.dispatch('projects/delete', { id })
        .then(() => {
          this.loadProjects()
        })
    }
  },
  created () {
    this.loadProjects()
  }
}
</script>

<style scoped>

</style>
