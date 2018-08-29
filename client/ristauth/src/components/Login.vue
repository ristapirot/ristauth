<template>
    <div>
        <h1>Enter login details</h1>
        <input type="text" name="name" v-model="name" placeholder="User name" />
        <input type="password" name="password" v-model="password" placeholder="User password" />
        <button type="submit" @click="login({ name, password })">LOGIN</button>
    </div>
</template>
<script>
export default {
  data () {
    return {
      name: '',
      password: ''
    }
  },
  methods: {
    login () {
      this.$store.dispatch('login', {
        name: this.name,
        password: this.password
      }).then(() => {
        this.$router.push('/')
      })
    }
  }
}
</script>
<style>
</style>
