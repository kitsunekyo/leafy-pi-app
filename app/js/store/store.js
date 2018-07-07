import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    auth: {
      user: null,
      token: null,
    }
  },
  mutations: {
    LOGIN_USER(state, payload) {
      state.auth.user = payload.user;
      state.auth.token = payload.token;
    },
    SET_TOKEN(state, token) {
      state.auth.token = token;
    },
    LOGOUT_USER(state) {
      document.cookie = `access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
      state.auth = {
        user: null,
        token: null
      };
    }
  },
  actions: {
    GET_USER_FROM_TOKEN({
      commit
    }, token) {
      return new Promise((resolve, reject) => {
        const decoded = jwt_decode(token);
        commit('LOGIN_USER', {
          user: {
            email: decoded.email,
            '_id': decoded._id
          },
          token
        })
      });
    },
    ATTEMPT_LOGIN({
      commit
    }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`//${window.location.hostname}:${CONFIG.api.port}/auth/login`, {
            email: payload.email,
            password: payload.password,
          })
          .then(response => {
            // SET COOKIE
            const d = new Date();
            d.setTime(d.getTime() + (1 * 60 * 60 * 1000));
            const expires = "expires=" + d.toUTCString();
            document.cookie = `access_token=${response.data.token}; ${expires}; path=/;`;
            // !SET COOKIE
            commit('LOGIN_USER', response.data);
            resolve(response);
          })
          .catch(err => {
            reject(err);
          });

      });
    },
  }
});

export default store;