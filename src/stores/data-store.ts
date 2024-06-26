import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
  }),
  actions: {
    authenticated(isAuthenticated: boolean) {
      this.isAuthenticated = isAuthenticated;
    },
    deauthenticate(isAuthenticated: boolean) {
      this.isAuthenticated = isAuthenticated;
    },
  },
});
