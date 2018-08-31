<template>
    <v-container>
        <v-layout>
          <v-flex xs6>
            <h1>{{ getProfile.name }}</h1>
          </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
  props: ['id'],
  mounted () {
    this.loadUser(this.$route.params.id)
  },
  methods: {
    loadUser (userId) {
      var user = this.$store.dispatch('getUser', userId)
      console.log(user)
    }
  },
  computed: {
    getProfile () {
      return this.$store.getters.getProfile
    }
  }
}
</script>
<style>
</style>
