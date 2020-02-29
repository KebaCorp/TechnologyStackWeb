/**
 * Authorization labels.
 *
 * @type {string}
 */
const ACCESS_TOKEN = 'access-token'
const ACCESS_TOKEN_EXPIRES = 'access-token-expires'
const REFRESH_TOKEN = 'refresh-token'

/**
 * Authorization model.
 */
export default class Authorization {
  /**
   * Is user authorised.
   *
   * @returns {boolean}
   */
  static isAuthorized () {
    return !!Authorization.getAccessToken()
  }

  /**
   * Is access token expired.
   *
   * @returns {boolean}
   */
  static isAccessTokenExpired () {
    return Authorization.getAccessTokenExpires() < Date.now() / 1000
  }

  /**
   * Set authorization data.
   *
   * @param accessToken
   * @param accessTokenExpires
   * @param refreshToken
   */
  static setData ({ accessToken, accessTokenExpires, refreshToken }) {
    Authorization.setAccessToken(accessToken)
    Authorization.setAccessTokenExpires(accessTokenExpires)
    Authorization.setRefreshToken(refreshToken)
  }

  /**
   * Clear authorization data.
   */
  static clearData () {
    Authorization.clearAccessToken()
    Authorization.clearRefreshToken()
    Authorization.clearAccessTokenExpires()
  }

  /**
   * Get access token.
   *
   * @returns {string | null}
   */
  static getAccessToken () {
    return localStorage.getItem(ACCESS_TOKEN)
  }

  /**
   * Set access token.
   *
   * @param token
   */
  static setAccessToken (token) {
    localStorage.setItem(ACCESS_TOKEN, token)
  }

  /**
   * Delete access token.
   */
  static clearAccessToken () {
    localStorage.removeItem(ACCESS_TOKEN)
  }

  /**
   * Get refresh token.
   *
   * @returns {string | null}
   */
  static getRefreshToken () {
    return localStorage.getItem(REFRESH_TOKEN)
  }

  /**
   * Set refresh token.
   *
   * @param token
   */
  static setRefreshToken (token) {
    localStorage.setItem(REFRESH_TOKEN, token)
  }

  /**
   * Delete refresh token.
   */
  static clearRefreshToken () {
    localStorage.removeItem(REFRESH_TOKEN)
  }

  /**
   * Get access token expires date.
   *
   * @returns {number}
   */
  static getAccessTokenExpires () {
    const value = Number.parseInt(localStorage.getItem(ACCESS_TOKEN_EXPIRES))
    return isNaN(value) ? 0 : value
  }

  /**
   * Set access token expires date.
   *
   * @param token
   */
  static setAccessTokenExpires (token) {
    localStorage.setItem(ACCESS_TOKEN_EXPIRES, token)
  }

  /**
   * Clear access token expires date.
   */
  static clearAccessTokenExpires () {
    localStorage.removeItem(ACCESS_TOKEN_EXPIRES)
  }
}
