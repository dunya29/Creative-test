import { authApi, getToken } from '@/api/api'
import { defineStore } from 'pinia'
const TOKEN_KEY = "creative-jwt-token"
const userData = {
    id: "",
    name: "",
    email: "",
    password: "",
    userRole: "user",
    disable: false,
    emailVerified: false
}
export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuthorized: false,
        userData,
        isMounted: false,
        isLogOutClicked: false
    }),
    actions: {
        auth(params) {
            localStorage.setItem(TOKEN_KEY, params.token + ":" + params.data.id)
            this.logInSuccess(params.data)
        },
        logInSuccess(params) {
            getToken()
            this.isAuthorized = true
            this.userData = {...this.userData, ...params}
        },
        logOutOnClick() {
            this.isLogOutClicked = true
        },
        async authMe() {
            try {
                const token = localStorage.getItem(TOKEN_KEY)
                const {data} = await authApi.authMe(token)
                this.logInSuccess(data)
            } catch(err) {
                console.log(err)
            } finally {
                this.isMounted = true             
            }     
        },
        logOut() {
            localStorage.removeItem(TOKEN_KEY)
            getToken()
            this.isAuthorized = false
            this.userData = {...userData}
            this.isLogOutClicked = false
        }
    }
})