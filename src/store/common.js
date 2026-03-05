import { projectsApi } from '@/api/api'
import { defineStore } from 'pinia'

export const useCommonStore = defineStore('common', {
    state: () => ({
        hasHeader: false,
        isMounted: false,
        isFirefox: false,
        projectsYears: [],
        statusArr: [],
        directionArr: [],
        granteeArr: [],
        isNotyClicked: false,
        isServerError: false
    }),
    actions: {
        showHeader() {
            this.hasHeader = true
        },
        unshowHeader() {
            this.hasHeader = false
        },
        pageOnMounted() {
            this.isMounted = true
        },
        pageOnUnMounted() {
            this.isMounted = false
        },
        async getYears() {
            if (!this.projectsYears.length) {
                try {
                    const { data } = await projectsApi.getYears()
                    this.projectsYears = [...data]
                } catch (err) {
                    console.log(err)
                }
            }
            return this.projectsYears
        },
        setStatus(data) {
            this.statusArr = [...data]
        },
        setDirection(data) {
            this.directionArr = [...data]
        },
        setGrantee(data) {
            this.granteeArr = [...data]
        },
        setFirefox(val) {
            this.isFirefox = val
        },
        notyOnClick() {
            this.isNotyClicked = true
        },
        notyOnSeen() {
            this.isNotyClicked = false
        },
        checkServerError(status) {
            this.isServerError = String(status).startsWith('5') ? true : false
        },
        unShowServerError() {
            this.isServerError = false
        }
    }
})