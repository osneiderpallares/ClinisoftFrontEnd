export default {
  meEndpoint: '/auth/me',
  loginEndpoint: '/jwt/login',
  loginRememberMe: '/jwt/rememberMe',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
