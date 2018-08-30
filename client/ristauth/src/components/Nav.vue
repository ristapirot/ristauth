<template>
    <v-toolbar dark color="primary">
      <v-toolbar-title class="white--text">Ristauth.com</v-toolbar-title>
      <v-toolbar-title class="white--text" v-if="getCurrentUser.isLogged">Welcome, {{currentUser.name}}</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <router-link to="/newpost" tag="v-btn" class="no-shadow"><v-btn flat v-if="getCurrentUser.isLogged">New Post</v-btn></router-link>
        <router-link to="/myposts" tag="v-btn" class="no-shadow"><v-btn flat v-if="getCurrentUser.isLogged">My Posts</v-btn></router-link>
        <v-btn flat v-if="getCurrentUser.isLogged" @click="logout">Logout</v-btn>
        <router-link to="/login" tag="v-btn" class="no-shadow" v-if="!getCurrentUser.isLogged"><v-btn flat >Login</v-btn></router-link>
        <router-link to="/register" tag="v-btn" class="no-shadow" v-if="!getCurrentUser.isLogged"><v-btn flat >Register</v-btn></router-link>
      </v-toolbar-items>

    </v-toolbar>
</template>

<script>
export default {
  data () {
    return {
      currentUser: {}
    }
  },
  computed: {
    getCurrentUser () {
      return this.$store.getters.getLoggedUser
    }
  },
  mounted () {
    if (localStorage.getItem('token')) {
      this.currentUser = JSON.parse(localStorage.getItem('user'))
    }
  }
}
</script>

<style scoped>
.no-shadow {
  box-shadow: none !important;
}
</style>
