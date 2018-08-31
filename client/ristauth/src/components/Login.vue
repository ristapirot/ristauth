<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row fill-height>
      <v-flex xs4 offset-xs4 align-start="true">
        <h1>Enter login details</h1>
        <v-form ref="form" class="loginForm" v-model="valid" lazy-validation>
          <v-text-field
            v-model="name"
            label="Username"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            :type="'password'"
            required
          ></v-text-field>

          <v-btn
            :disabled="!valid"
            @click="login({ name, password })"
          >
            login
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
      name: '',
      password: '',
      valid: true
    }
  },
  methods: {
    login () {
      if (this.name === '' || this.password === '') {
        return alert('Fill all fields!')
      }
      this.$store.dispatch('login', {
        name: this.name,
        password: this.password
      }).then(() => {
        this.$router.push('/')
      })
    },
    clear () {
      this.name = ''
      this.password = ''
    }
  }
}
</script>
<style scoped>
  .loginWrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .login {
    width: 30%;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
</style>
