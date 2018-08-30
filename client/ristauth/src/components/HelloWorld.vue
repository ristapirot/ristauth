<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <v-expansion-panel class="posts">
      <v-expansion-panel-content
        v-for="post in getPosts"
        :key="post._id"
      >
        <div slot="header">{{ post.title }}</div>
        <v-card>
          <v-card-text>{{ post.content }}</v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to my first working Auth software. This will scale up when this becomes 100% secure.',
      currentUser: {},
      items: ['Logout']
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
.posts {
  width: 60%;
  margin: 2em auto;
}

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
