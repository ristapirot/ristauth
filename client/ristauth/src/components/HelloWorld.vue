<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1 v-if="getCurrentUser.isLogged">Welcome, {{currentUser.name}}</h1>
    <div v-if="!getCurrentUser.isLogged">
      <h2>Have an account? Click below to login.</h2>
      <ul>
        <li>
          <router-link to="/login" tag="a">
            Login
          </router-link>
        </li>
      </ul>
    </div>
    <div v-if="!getCurrentUser.isLogged">
      <h2>You're still not part of our team? Join now!</h2>
      <ul>
        <li>
          <router-link to="/register" tag="a">
            Register
          </router-link>
        </li>
      </ul>
    </div>
    <div v-if="getCurrentUser.isLogged">
      <h2 @click="logout"><a href="">Logout</a></h2>
    </div>
    <div v-if="getCurrentUser.isLogged">
      <h2><router-link to="/newpost" tag="a">New post</router-link></h2>
    </div>
    <div v-if="getCurrentUser.isLogged">
      <h2><router-link to="/myposts" tag="a">My posts</router-link></h2>
    </div>
    <div v-for="post in getPosts" :key="post._id">
      <h2>{{ post.title }}</h2>
      <p>{{ post.content }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to my first working Auth software. This will scale up when this becomes 100% secure.',
      currentUser: {}
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
    }
  },
  computed: {
    getCurrentUser () {
      return this.$store.getters.getLoggedUser
    },
    getPosts () {
      return this.$store.getters.getPosts
    }
  },
  created () {
    this.$store.dispatch('getPosts')
  },
  mounted () {
    if (localStorage.getItem('token')) {
      this.currentUser = JSON.parse(localStorage.getItem('user'))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
