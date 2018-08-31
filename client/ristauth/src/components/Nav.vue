<template>
    <v-toolbar class="navbar" color="pink lighten-2" :height="navbarHeight">
      <v-toolbar-title class="white--text">Ristauth.com</v-toolbar-title>
      <v-toolbar-title class="white--text" v-if="getCurrentUser.isLogged">Welcome, {{currentUser.name}}</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <router-link to="/newpost" tag="v-btn" class="no-shadow" v-if="getCurrentUser.isLogged"><v-btn flat color="white">New Post</v-btn></router-link>
        <router-link to="/myposts" tag="v-btn" class="no-shadow" v-if="getCurrentUser.isLogged"><v-btn flat color="white">My Posts</v-btn></router-link>
        <v-btn flat v-if="getCurrentUser.isLogged" @click="logout" color="white">Logout</v-btn>
        <router-link to="/login" tag="v-btn" class="no-shadow" v-if="!getCurrentUser.isLogged"><v-btn flat color="white">Login</v-btn></router-link>
        <router-link to="/register" tag="v-btn" class="no-shadow" v-if="!getCurrentUser.isLogged"><v-btn flat color="white">Register</v-btn></router-link>
      </v-toolbar-items>

    </v-toolbar>
</template>

<script>
export default {
  data () {
    return {
      currentUser: {},
      navbarHeight: '35px'
    }
  },
  computed: {
    getCurrentUser () {
      return this.$store.getters.getLoggedUser
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout').then(this.$router.push('/'))
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
  background-color: transparent !important;
}

.navbar {
  padding: 0 25em !important;
}
</style>
