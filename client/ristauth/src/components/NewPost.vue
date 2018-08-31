<template>
    <!-- <div>
        <h1>{{currentUser.name}}, time to add new post!</h1>
        <input type="text" v-model="title" name="title" placeholder="Title..." />
        <textarea name="content" v-model="content" cols="30" rows="10" aria-placeholder="Content..."></textarea>
        <button type="submit" @click="addPost">POST</button>
    </div> -->
    <v-container fluid>
      <v-layout row justify-center align-center>
        <v-flex xs4>
          <h1>{{currentUser.name}}, time to add new post!</h1>
        </v-flex>
      </v-layout>
      <br>
      <br>
      <v-layout justify-center align-center fill-height>
        <v-flex xs4>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="title"
              label="Title"
              box
              required
            ></v-text-field>
            <v-textarea
              box
              name="content"
              v-model="content"
              label="Content"
            ></v-textarea>
            <v-btn
              :disabled="!valid"
              @click="addPost"
            >
              submit
            </v-btn>
            <v-btn @click="clear">clear</v-btn>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
</template>
<script>
export default {
  data () {
    return {
      currentUser: {},
      title: '',
      content: '',
      createdBy: '',
      valid: true
    }
  },
  methods: {
    addPost () {
      var title = this.title
      var content = this.content
      var createdBy = this.currentUser._id
      console.log({ title, content, createdBy })
      this.$store.dispatch('post', { title, content, createdBy })
    },
    clear () {
      this.title = ''
      this.content = ''
    }
  },
  mounted () {
    if (!localStorage.getItem('token')) {
      this.$router.push('/')
    }
    this.currentUser = JSON.parse(localStorage.getItem('user'))
  }
}
</script>
<style>
</style>
