<template>
    <div>
        <h1>{{currentUser.name}} Posts</h1>
        <div v-for="post in getPosts" :key="post._id">
            <h2>{{ post.title }}</h2>
            <p>{{ post.content }}</p>
            <button @click="deletePost(post._id)">Delete</button>
            <button @click="showEditForm(post._id)">Edit</button>
            <div>
              <div v-if="flags[getPosts.findIndex(el => el._id === post._id)]">
                <h3>Edit post</h3>
                <input type="text" name="title" v-model="titleEdit" />
                <textarea name="content" v-model="contentEdit" cols="30" rows="10"></textarea>
                <button @click="editPost(post._id)">Done editting</button>
              </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      currentUser: {},
      titleEdit: '',
      contentEdit: '',
      editForm: false,
      flags: []
    }
  },
  methods: {
    deletePost (postId) {
      if (confirm('Are you sure you want to delete this post?')) {
        var userId = this.currentUser._id
        this.$store.dispatch('deletePost', {userId, postId})
      }
    },
    showEditForm (id) {
      var currentFlags = this.flags

      var numberOfPosts = this.getFlags
      this.flags = []
      for (let i = 0; i < numberOfPosts; i++) {
        this.flags.push(currentFlags[i])
      }
      var post = this.getPosts.filter(el => el._id === id)
      var indexOfPost = this.getPosts.findIndex(el => el._id === id)
      this.flags[indexOfPost] = !this.flags[indexOfPost]
      this.titleEdit = post[0].title
      this.contentEdit = post[0].content
    },
    editPost (postId) {
      var userId = this.currentUser._id
      var title = this.titleEdit
      var content = this.contentEdit
      this.$store.dispatch('updatePost', { userId, postId, creds: { title: title, content: content } })
      this.showEditForm(postId)
    }
  },
  mounted () {
    if (!localStorage.getItem('token')) {
      this.$router.push('/')
    }
    this.currentUser = JSON.parse(localStorage.getItem('user'))
    this.$store.dispatch('getPostsByUser', this.currentUser._id)
    this.flags = []
    for (let i = 0; i < this.getFlags; i++) {
      this.flags.push(false)
    }
  },
  computed: {
    getPosts () {
      return this.$store.getters.getPostsByUser
    },
    getFlags () {
      return this.getPosts.length
    }
  }
}
</script>
<style>
</style>
