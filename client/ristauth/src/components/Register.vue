<template>
    <div>
        <h1>Enter registration details</h1>
        <form action="">
            <input type="text" name="name" v-model="name" placeholder="User name" />
            <input type="password" name="password" v-model="password" placeholder="User password" />
            <button type="submit" @click="register({ name, password })">REGISTER</button>
        </form>
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
    register () {
      this.$store.dispatch('register', {
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
