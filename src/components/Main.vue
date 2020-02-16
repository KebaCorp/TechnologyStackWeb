<template>
  <v-row
    align="center"
    justify="center"
  >
    <v-col
      cols="12"
      sm="8"
      md="4"
    >
      <v-card
        v-for="(item, index) in payload"
        :key="index"
        class="mx-auto mb-5"
        max-width="344"
        outlined
      >
        <technologies-list
          :technologyType="item.type"
          :technologies="item.technologies"
        />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
const TechnologiesList = () => import('./TechnologiesList')

export default {
  name: 'Main',
  components: { TechnologiesList },
  data: () => ({
    payload: [
      {
        type: {
          Title: 'Type1'
        },
        technologies: [
          {
            ID: 2,
            TypeId: 1,
            StageId: 1,
            Title: 'Test',
            IsDeprecated: false,
            CreatorUserId: 1,
            CreatedAt: '2020-02-16T19:44:24.364Z',
            UpdatedAt: '2020-02-16T19:44:26.372Z'
          },
          {
            ID: 3,
            TypeId: 1,
            StageId: 2,
            Title: 'Test 2',
            IsDeprecated: false,
            CreatorUserId: 1,
            CreatedAt: '2020-02-16T17:20:34.717949Z',
            UpdatedAt: '2020-02-16T17:20:34.717949Z'
          }
        ]
      },
      {
        type: {
          Title: 'Type2'
        },
        technologies: [
          {
            ID: 2,
            TypeId: 1,
            StageId: 1,
            Title: 'Test',
            IsDeprecated: false,
            CreatorUserId: 1,
            CreatedAt: '2020-02-16T19:44:24.364Z',
            UpdatedAt: '2020-02-16T19:44:26.372Z'
          },
          {
            ID: 3,
            TypeId: 1,
            StageId: 2,
            Title: 'Test 2',
            IsDeprecated: false,
            CreatorUserId: 1,
            CreatedAt: '2020-02-16T17:20:34.717949Z',
            UpdatedAt: '2020-02-16T17:20:34.717949Z'
          }
        ]
      }
    ]
  }),
  created () {
    this.$store.dispatch('technologies/getTechnologies')
  }
}
</script>

<style scoped>

</style>
