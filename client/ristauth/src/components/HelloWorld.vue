<template>
  <v-container>
    <v-layout>
      <h1>{{ msg }}</h1>
    </v-layout>
    <v-layout>
      <hello-search />
    </v-layout>
    <v-layout>
      <v-expansion-panel class="posts">
      <v-expansion-panel-content
        v-for="post in getPosts"
        :key="post._id"
      >
        <div slot="header">{{ post.title }}</div>
        <v-card>
          <v-card-text>{{ post.content }}</v-card-text>
          <v-card-text>Posted by: <router-link tag='v-chip' :to="'/profile/' + post.createdBy.name">{{ post.createdBy.name }}</router-link></v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    </v-layout>
  </v-container>
</template>

<script>
import HelloSearch from './HelloSearch.vue'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to my first working Auth software. It is scaling up very good.',
      currentUser: {},
      items: ['Logout']
    }
  },
  methods: {
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
  },
  components: {
    HelloSearch
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
  line-height: 4em;
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
  color: #E91E63;
}

.v-chip:hover {
  background-color: #E91E63;
  color: white;
}
</style>
