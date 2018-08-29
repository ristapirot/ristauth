<template>
    <div>
        <h1>{{currentUser.name}}, time to add new post!</h1>
        <input type="text" v-model="title" name="title" placeholder="Title..." />
        <textarea name="content" v-model="content" cols="30" rows="10" aria-placeholder="Content..."></textarea>
        <button type="submit" @click="addPost">POST</button>
    </div>
</template>
<script>
export default {
  data () {
    return {
      currentUser: {},
      title: '',
      content: '',
      createdBy: ''
    }
  },
  methods: {
    addPost () {
      var title = this.title
      var content = this.content
      var createdBy = this.currentUser._id
      console.log({ title, content, createdBy })
      this.$store.dispatch('post', { title, content, createdBy })
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
