import Axios from 'axios'
import i18n from '@/i18n'

/**
 * Создание Axios с параметрами.
 *
 * @type {AxiosInstance}
 */
const axios = Axios.create({
  baseURL: process.env.VUE_APP_API_PATH || '/web/api/',
  headers: {
    'Accept-Language': i18n.locale
  }
})

export { axios }
