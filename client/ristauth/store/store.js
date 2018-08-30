import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { SIGPIPE } from 'constants';

Vue.use(Vuex);

const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";
const REGISTER = "REGISTER";
const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const GET_POSTS = "GET_POSTS";
const GET_POSTS_BY_USER = "GET_POSTS_BY_USER";
const POST = "POST";
const POST_SUCCESS = "POST_SUCCESS";
const UPDATE_POST = "UPDATE_POST";
const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS";

var api = axios.create({
    baseURL: 'http://localhost:3000/'
})

var state = {
    isLoggedIn: !!localStorage.getItem('token'),
    currentUser: {},
    posts: [],
    postsByUser: []
};

var getters = {
    getLoggedUser: state => {
        return {
            isLogged: state.isLoggedIn,
            user: state.currentUser
        }
    },
    getPosts: state => state.posts,
    getPostsByUser: state => state.postsByUser
};

var mutations = {
    [LOGIN] (state) {
        state.pending = true;
    },
    [LOGIN_SUCCESS] (state, { user }) {
        state.isLoggedIn = true;
        state.pending = false;
        state.currentUser = user;
        alert('Logged in!')
    },
    [LOGOUT] (state) {
        state.isLoggedIn = false;
    },
    [REGISTER] (state) {
        state.pending = true;
    },
    [REGISTER_SUCCESS] (state) {
        alert('User registered!');
    },
    [GET_POSTS] (state, posts) {
        state.posts = posts;
    },
    [GET_POSTS_BY_USER] (state, posts) {
        state.postsByUser = posts;
    },
    [POST] (state) {

    },
    [POST_SUCCESS] (state) {
        alert('Post added!');
    },
    [UPDATE_POST] (state) {
        alert('Post updated!');
    },
    [DELETE_POST_SUCCESS] (state, postId) {
        state.postsByUser = state.postsByUser.filter(el => el._id !== postId);
        console.log(state.postsByUser);
    }
};

var actions = {
    login({commit}, creds) {
        commit(LOGIN);
        api.post('/api/authenticate', creds).then(result => {
            setTimeout(() => {
                if (result.data.success) {
                    var user = result.data.user;
                    localStorage.setItem('token', result.data.token);
                    localStorage.setItem('user', JSON.stringify(user));
                    commit(LOGIN_SUCCESS, { user });
                }
            }, 500)
        })
    },
    logout({commit}) {
        localStorage.removeItem("token");
        localStorage.removeItem('user');
        commit(LOGOUT);
    },
    register({commit}, creds) {
        commit(REGISTER);
        api.post('/register', creds).then(result => {
            if (result.data.success) {
                setTimeout(() => {
                    commit(REGISTER_SUCCESS);
                }, 500)
            } else {
                alert('Registration failed! Username taken!')
            }
        })
    },
    getPosts({commit}) {
        api.get('/api/posts').then(result => {
            commit(GET_POSTS, result.data);
        })
    },
    getPostsByUser({commit}, userId) {
        api.get('/api/user/' + userId + '/posts', {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        }).then(result => {
            commit(GET_POSTS_BY_USER, result.data.posts);
        })
    },
    post({commit}, creds) {
        commit(POST);
        api.post('/api/post', creds, {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        }).then(result => {
            if (result.data.success) {
                setTimeout(() => {
                    commit(POST_SUCCESS);
                }, 500)
            }
        })
    },
    updatePost({commit}, { userId, postId, creds }) {
        api.put('/api/user/' + userId + '/post/' + postId, creds, {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        }).then(result => {
            console.log(result)
        })
    },
    deletePost({commit}, {userId, postId}) {
        api.delete('api/user/' + userId + '/post/' + postId, {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        }).then(result => {
            if (result.data.success) {
                commit(DELETE_POST_SUCCESS, postId)
            }
        })
    }
};

export default new Vuex.Store({
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions
})