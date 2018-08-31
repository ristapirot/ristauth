<template>
    <!-- <div>
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
    </div> -->
    <v-container fluid>
      <v-layout justify-center>
        <v-flex xs6>
          <h1>Posts by {{currentUser.name}}</h1>
        </v-flex>
      </v-layout>
      <v-layout justify-center align-center>
        <v-flex xs6>
          <v-expansion-panel class="posts">
            <v-expansion-panel-content
              v-for="post in getPosts"
              :key="post._id"
            >
              <!-- TO DO, CLICK ONLY WORKS ON TEXT NOT ON ALL DIV -->
              <div slot="header" @click="showEditForm(post._id)">{{ post.title }}</div>
              <v-card>
                <v-layout justify-center>
                  <v-flex xs6>
                    <v-form ref="form" v-model="valid" lazy-validation>
                      <v-text-field
                        v-model="titleEdit"
                        label="Title"
                        box
                        required
                      ></v-text-field>
                      <v-textarea
                        box
                        name="content"
                        v-model="contentEdit"
                        label="Content"
                      ></v-textarea>
                      <v-btn
                        :disabled="!valid"
                        @click="editPost(post._id)"
                      >
                        edit post
                      </v-btn>
                      <v-btn
                        :disabled="!valid"
                        @click="deletePost(post._id)"
                      >
                        delete post
                      </v-btn>
                    </v-form>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>
      </v-layout>
    </v-container>
</template>
<script>
export default {
  data () {
    return {
      currentUser: {},
      titleEdit: '',
      contentEdit: '',
      editForm: false,
      flags: [],
      valid: true
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

<style scoped>
  .v-form {
    margin: 2em 0;
  }

  h1 {
    line-height: 4em;
  }
</style>
