
import axios from "axios"
export const BASE_URL = import.meta.env.VITE_API_URL
export const FILE_UPLOAD_URL = import.meta.env.VITE_API_UPLOAD_URL
export const TOKEN_KEY = "creative-jwt-token"
const instance = axios.create({
    baseURL: BASE_URL
})
instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
export function getToken() {
    const token = localStorage.getItem(TOKEN_KEY)
    if (token) {
        instance.defaults.headers.common['Authorization'] = token;
    } else {
        delete instance.defaults.headers.common['Authorization']
    }
}
export const statusApi = {
    getItems() {
        return instance.get(`status`)
    }
}
export const directionApi = {
    getItems() {
        return instance.get(`direction`)
    }
}
export const granteeApi = {
    getItems() {
        return instance.get(`grantee`)
    }
}
export const rateApi = {
    getItems(year) {
        return instance.get(`rate?year=${year}`)
    }
}
export const authApi = {
    createUser(data) {
        return instance.post('register', data)
    },
    auth(email, password) {
        return instance.post('auth', { email, password })
    },
    disableUser(email) {
        return instance.post('user-block', { email })
    },
    authMe(token) {
        return instance.get('auth_me', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
    },
    forgotPassword(email) {
        return instance.post('password-reset', { email })
    },
    recoveryPassword(token, password) {
        return instance.post('password-update', { token, password })
    },
    emailVerify(email) {
        return instance.post('user-verify', { email })
    },
    emailVerifySuccess(email, token) {
        return instance.post('verify-email', { email, token })
    },
    changePassword(userId, data) {
        return instance.patch('users/' + userId, data)
    }
}
export const projectsApi = {
    getFileTemplates() {
        return instance.get('projects-templates')
    },
    getPath(role, userId, allProjects = false) {
        let path
        switch (role) {
            case 'user':
                path = 'user-projects' + (allProjects ? '?_select=id,imageURL,title,status,deadline' : '')
                break
            case 'expert':
                path = 'experts-projects' + (allProjects ? '?_select=id,imageURL,title,wave,direction,point' : '')
                break
            case 'expertSpecComp':
                path = 'spec-experts-projects' + (allProjects ? '?_select=id,imageURL,title,wave,direction,point' : '')
                break
            case 'workingGroup':
                path = 'wg-projects' + (allProjects ? '?_select=id,imageURL,title' : '')
                break
            case 'manager':
                path = 'manager-projects' + (allProjects ? '?_select=id,imageURL,title,wave,point,status' : '')
                break
        }
        return path
    },
    getYears() {
        return instance.get('projects-years?sortBy=-id')
    },
    getExpertYears() {
        return instance.get('expert-years?sortBy=-id')
    },
    getItems(role, userId, params) {
        let path = this.getPath(role, userId, true)
        return instance.get(path, { params })
    },
    getItem(role, userId, id) {
        let path = this.getPath(role, userId)
        return instance.get(path + '/' + id)
    },
    postItem(data, role, userId) {
        let path = this.getPath(role, userId)
        return instance.post(path, data)
    },
    editItem(id, data, role = false, userId = false) {
        if (role && userId) {
            let path = this.getPath(role, userId)
            return instance.patch(path + '/' + id, data)
        } else {
            return instance.patch('projects/' + id, data)
        }
    },
    changeStatus(id, data) {
        return instance.patch('projects-status/' + id, data)
    },
    delItem(id, role, userId) {
        return instance.delete('manager-projects/' + id)
    },
    getReferences() {
        return instance.get('projects-references?sortBy=-id')
    }
}
export const registerApi = {
    getItems(params) {
        return instance.get('register-data', { params })
    },
    editComment(id, data) {
        return instance.patch('register-data/' + id, data)
    },
}
export const ratingApi = {
    getItems(projectId) {
        /*return instance.get(`rating/${projectId}`)*/
        return instance.get('rating')
    },
    getItem(projectId, expertId) {
        /*return instance.get(`rating/${projectId}?expertId=${expertId}`)*/
        return instance.get('rating?expertId=' + expertId)
    },
    postItem(projectId, data) {
        /*return instance.post(`rating/${projectId}`, data)*/
        return instance.post('rating', data)
    },
    editItem(projectId, id, data) {
        /* return instance.patch(`rating/${projectId}/${id}`, data) */
        return instance.patch('rating/' + id, data)
    },
}
export const ratingArchiveApi = {
    getItems(projectId) {
        /*return instance.get(`rating-archive/${projectId}`)*/
        return instance.get('rating-archive')
    },
    getItem(projectId, expertId) {
        /*return instance.get(`rating-archive/${projectId}?expertId=${expertId}`)*/
        return instance.get('rating-archive?expertId=' + expertId)
    },
    postItem(projectId, data) {
        /*return instance.post(`rating-archive/${projectId}`, data)*/
        return instance.post('rating-archive', data)
    },
    editItem(projectId, id, data) {
        /* return instance.patch(`rating-archive/${projectId}/${id}`, data) */
        return instance.patch('rating-archive/' + id, data)
    },
}
export const messagesApi = {
    getItems(params) {
        return instance.get('messages', { params })
    },
    postItem(data) {
        return instance.post('messages', data)
    },
    editItem(data) {
        return instance.patch('messages', data)
    }
}
export const notificationsApi = {
    getItems(params = false) {
        return params ? instance.get('notifications', { params }) : instance.get('notifications')
    },
    editItem(id, data) {
        return instance.patch('notifications/' + id, data)
    }
}
export const docsVideoApi = {
    getItems() {
        return instance.get('docs-video?sortBy=orderId')
    },
    delItem(id) {
        return instance.delete('docs-video/' + id)
    },
    postItem(data, signal) {
        return instance.post('docs-video', data, { signal })
    },
    sort(data) {
        return instance.patch('docs-video', data)
    },
}
export const docsApi = {
    getItems() {
        return instance.get(`docs?sortBy=orderId`)
    },
    delItem(id) {
        return instance.delete('docs/' + id)
    },
    postItem(data, signal) {
        return instance.post('docs', data, { signal })
    },
    sort(data) {
        return instance.patch('docs', data)
    },
}
export const wavesApi = {
    getItems(params) {
        return instance.get('waves', { params })
    },
    delItem(year, id) {
        return instance.delete('waves/' + id, {
            params: { year }
        })
    },
    postItem(year, data) {
        return instance.post('waves', data, {
            params: { year }
        })
    },
    editItem(year, id, data) {
        return instance.patch('waves/' + id, data, {
            params: { year }
        })
    }
}
export const mediaApi = {
    getItem(project_id, paramName, file_num) {
        const requestParams = {
            method: 'get',
            url: '/get-file',
            params: {
                project_id,
                paramName,
                file_num,
            },
            responseType: 'blob',
        }
        return instance.request(requestParams)
    }
}