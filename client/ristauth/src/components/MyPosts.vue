<template>
    <div>
        <h1>{{currentUser.name}} Posts</h1>
        <div v-for="post in getPosts" :key="post._id">
            <h2>{{ post.title }}</h2>
            <p>{{ post.content }}</p>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      currentUser: {}
    }
  },
  methods: {
  },
  mounted () {
    if (!localStorage.getItem('token')) {
      this.$router.push('/')
    }
    this.currentUser = JSON.parse(localStorage.getItem('user'))
    this.$store.dispatch('getPostsByUser', this.currentUser._id)
  },
  computed: {
    getPosts () {
      return this.$store.getters.getPostsByUser
    }
  }
}
</script>
<style>
</style>
