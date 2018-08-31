import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Register from '@/components/Register'
import MyPosts from '@/components/MyPosts'
import NewPost from '@/components/NewPost'
import Profile from '@/components/Profile'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/myposts',
      name: 'MyPosts',
      component: MyPosts
    },
    {
      path: '/newpost',
      name: 'NewPost',
      component: NewPost
    },
    {
      path: '/profile/:id',
      name: 'Profile',
      component: Profile,
      props: true
    }
  ]
})
