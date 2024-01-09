// ** React Imports
import { createContext, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

import jwt from 'jsonwebtoken'

// ** Config
import authConfig from 'src/configs/auth'

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}
const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      if (storedToken) {
        setLoading(true)
        await axios
          .get(authConfig.meEndpoint, {
            headers: {
              Authorization: storedToken
            }
          })
          .then(async response => {
          //*************************************************** 
       // Almacenar el tiempo de inicio de la sesión cuando el usuario inicia sesión
        const startTime = Date.now();
        window.localStorage.setItem('startTime', startTime);

        // Rastrea el tiempo de inactividad del usuario
        let timeoutId = null;

        window.addEventListener('load', resetTimer);
        window.addEventListener('mousemove', resetTimer);
        window.addEventListener('mousedown', resetTimer); // catches touchscreen presses as well
        window.addEventListener('click', resetTimer); // catches touchpad clicks as well
        window.addEventListener('scroll', resetTimer); // catches scrolling with arrow keys
        window.addEventListener('keypress', resetTimer);

        function resetTimer() {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
        // El usuario ha estado inactivo durante un cierto período de tiempo
        // Cerrar la sesión del usuario
        setUser(null)
        window.localStorage.removeItem('userData')
        window.localStorage.removeItem(authConfig.storageTokenKeyName)
        window.localStorage.removeItem('startTime')
        router.push('/login')
        }, 900000); // 15 minutes
        }
       //*************************************************** 
            setLoading(false)
            setUser({ ...response.data.userData })
          })
          .catch(() => {
            localStorage.removeItem('userData')
            //localStorage.removeItem('refreshToken')
            localStorage.removeItem('accessToken')
            setUser(null)
            setLoading(false)
            if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
              router.replace('/login')
            }
          })
      } else {
        setLoading(false)
      }
    }
    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const jwtConfig = {
    secret: process.env.NEXT_PUBLIC_JWT_SECRET,
    expirationTime: process.env.NEXT_PUBLIC_JWT_EXPIRATION,
    refreshTokenSecret: process.env.NEXT_PUBLIC_JWT_REFRESH_TOKEN_SECRET
  }

  const handleLogin = (params, errorCallback) => {
    const { email, password, rememberMe } = params

    const formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)
    formData.append('rememberMe', rememberMe)
    axios({
      url: 'http://127.0.0.1:8000/api/login/',
      method: 'POST',
      data: formData
    })
      .then(async response => {
       //*************************************************** 
       // Almacenar el tiempo de inicio de la sesión cuando el usuario inicia sesión
        const startTime = Date.now();
        window.localStorage.setItem('startTime', startTime);

        // Rastrea el tiempo de inactividad del usuario
        let timeoutId = null;

        window.addEventListener('load', resetTimer);
        window.addEventListener('mousemove', resetTimer);
        window.addEventListener('mousedown', resetTimer); // catches touchscreen presses as well
        window.addEventListener('click', resetTimer); // catches touchpad clicks as well
        window.addEventListener('scroll', resetTimer); // catches scrolling with arrow keys
        window.addEventListener('keypress', resetTimer);

        function resetTimer() {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
        // El usuario ha estado inactivo durante un cierto período de tiempo
        // Cerrar la sesión del usuario
        setUser(null)
        window.localStorage.removeItem('userData')
        window.localStorage.removeItem(authConfig.storageTokenKeyName)
        window.localStorage.removeItem('startTime')
        router.push('/login')
        }, 900000); // 15 minutes
        }
       //*************************************************** 
       if (!response.data) {
          throw 'Credentials are invalid or user was deleted'
        }
       if(rememberMe){
        window.localStorage.setItem('emailstore', params.email)
       } 
        const accessToken = jwt.sign({ id: response.data[0].id }, jwtConfig.secret)
        
        params ? window.localStorage.setItem(authConfig.storageTokenKeyName, accessToken) : null
        
        const returnUrl = router.query.returnUrl
        setUser(response.data[0])
        params ? window.localStorage.setItem('userData', JSON.stringify(response.data)) : null
        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
        router.replace(redirectURL)
      })
      .catch(err => {
        if (err) console.log(err)

        //if (err.response) console.log(err.response.data.detail)

        if (errorCallback) errorCallback(err)
      })

    // axios
    //   .post(authConfig.loginEndpoint, params)
    //   .then(async response => {
    //     console.log("response")
    //     params.rememberMe
    //       ? window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken)
    //       : null
    //     const returnUrl = router.query.returnUrl
    //     setUser({ ...response.data.userData })
    //     params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(response.data.userData)) : null
    //     const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
    //     router.replace(redirectURL)
    //   })
    //   .catch(err => {
    //     if (errorCallback) errorCallback(err)
    //   })
    
   
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
    
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
