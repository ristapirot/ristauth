<template>
    <v-container fluid>
        <v-layout justify-center>
            <v-flex xs6 class="input-bar">
                <v-toolbar
                    dark
                    color="pink lighten-1"
                >
                    <v-toolbar-title>Loading country</v-toolbar-title>
                    <v-autocomplete
                        :loading="loading"
                        :items="items"
                        :search-input.sync="search"
                        v-model="select"
                        cache-items
                        class="mx-3"
                        flat
                        hide-no-data
                        hide-details
                        label="What state are you from?"
                        solo-inverted
                    ></v-autocomplete>
                </v-toolbar>
            </v-flex>
            <v-flex xs6 class="input-bar">
                <v-toolbar
                    dark
                    color="pink lighten-1"
                >
                    <v-toolbar-title>Unloading country</v-toolbar-title>
                    <v-autocomplete
                    v-model="field2"
                    cache-items
                    class="mx-3"
                    flat
                    hide-no-data
                    hide-details
                    label="Where do you want to load your truck?"
                    solo-inverted
                    ></v-autocomplete>
                </v-toolbar>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      items: [],
      search: null,
      select: null,
      states: [
        'Alabama',
        'Alaska',
        'American Samoa',
        'Arizona',
        'Arkansas',
        'California',
        'Colorado',
        'Connecticut',
        'Delaware',
        'District of Columbia',
        'Federated States of Micronesia',
        'Florida',
        'Georgia',
        'Guam',
        'Hawaii',
        'Idaho',
        'Illinois',
        'Indiana',
        'Iowa',
        'Kansas',
        'Kentucky',
        'Louisiana',
        'Maine',
        'Marshall Islands',
        'Maryland',
        'Massachusetts',
        'Michigan',
        'Minnesota',
        'Mississippi',
        'Missouri',
        'Montana',
        'Nebraska',
        'Nevada',
        'New Hampshire',
        'New Jersey',
        'New Mexico',
        'New York',
        'North Carolina',
        'North Dakota',
        'Northern Mariana Islands',
        'Ohio',
        'Oklahoma',
        'Oregon',
        'Palau',
        'Pennsylvania',
        'Puerto Rico',
        'Rhode Island',
        'South Carolina',
        'South Dakota',
        'Serbia',
        'Tennessee',
        'Texas',
        'Utah',
        'Vermont',
        'Virgin Island',
        'Virginia',
        'Washington',
        'West Virginia',
        'Wisconsin',
        'Wyoming'
      ]
    }
  },
  watch: {
    search (val) {
      val && val !== this.select && this.querySelections(val)
    }
  },
  methods: {
    querySelections (v) {
      this.loading = true
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.states.filter(e => {
          return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
        })
        this.loading = false
      }, 500)
    }
  }
}
</script>

<style scoped>
    .input-bar {
        margin: 0 0.5em;
    }

    .v-autocomplete__content {
        top: 0 !important;
        left: 0 !important;
    }
</style>
