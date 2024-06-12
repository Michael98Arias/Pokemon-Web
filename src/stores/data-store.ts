import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
  }),
  actions: {
    authenticated(isAuthenticated: boolean, role:string, id: number) {
      this.isAuthenticated = isAuthenticated;
    },
    deauthenticate() {
      this.isAuthenticated = false;
    },
  },
});
