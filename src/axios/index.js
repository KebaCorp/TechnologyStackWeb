import Axios from 'axios'
import i18n from '@/i18n'
import Authorization from '@/models/Authorization'

/**
 * Create Axios.
 *
 * @type {AxiosInstance}
 */
const axios = Axios.create({
  baseURL: process.env.VUE_APP_API_PATH || '/web/api/',
  headers: {
    'Accept-Language': i18n.locale
  }
})

/**
 * Before request actions.
 */
axios.interceptors.request.use(async config => {
  if (Authorization.isAuthorized()) {
    config.headers.Authorization = `Bearer ${Authorization.getAccessToken()}`
  }

  return config
}, error => {
  return Promise.reject(error)
})

export { axios }
