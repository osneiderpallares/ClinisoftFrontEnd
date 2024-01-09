// ** JWT import
import { exists } from 'i18next'
import jwt from 'jsonwebtoken'

// ** Mock Adapter
import mock from 'src/@fake-db/mock'

// ** Default AuthConfig
import defaultAuthConfig from 'src/configs/auth'

//* Mensaje en ventana
import toast from 'react-hot-toast'
import { end } from '@popperjs/core'

const users = [
  {
    id: 1,
    role: 'admin',
    password: 'admin',
    fullName: 'John Doe',
    username: 'johndoe',
    email: 'admin@vuexy.com'
  },
  {
    id: 2,
    role: 'client',
    password: 'client',
    fullName: 'Jane Doe',
    username: 'janedoe',
    email: 'client@vuexy.com'
  }
]

// ! These two secrets should be in .env file and not in any other file
const jwtConfig = {
  secret: process.env.NEXT_PUBLIC_JWT_SECRET,
  expirationTime: process.env.NEXT_PUBLIC_JWT_EXPIRATION,
  refreshTokenSecret: process.env.NEXT_PUBLIC_JWT_REFRESH_TOKEN_SECRET
}
mock.onPost('/jwt/login').reply(request => {
  const { email, password } = JSON.parse(request.data)

  let error = {
    email: ['Something went wrong']
  }

  var user = users.find(u => u.email === email && u.password === password)

  if (user) {
    const accessToken = jwt.sign({ id: user.id }, jwtConfig.secret, { expiresIn: jwtConfig.expirationTime })

    const response = {
      accessToken,
      userData: { ...user, password: undefined }
    }

    return [200, response]
  } else {
    error = {
      email: ['email or Password is Invalid']
    }

    return [400, { error }]
  }
})
mock.onPost('/jwt/register').reply(request => {
  if (request.data.length > 0) {
    const { email, password, username } = JSON.parse(request.data)
    const isEmailAlreadyInUse = users.find(user => user.email === email)
    const isUsernameAlreadyInUse = users.find(user => user.username === username)

    const error = {
      email: isEmailAlreadyInUse ? 'This email is already in use.' : null,
      username: isUsernameAlreadyInUse ? 'This username is already in use.' : null
    }
    if (!error.username && !error.email) {
      const { length } = users
      let lastIndex = 0
      if (length) {
        lastIndex = users[length - 1].id
      }

      const userData = {
        id: lastIndex + 1,
        email,
        password,
        username,
        avatar: null,
        fullName: '',
        role: 'admin'
      }
      users.push(userData)
      const accessToken = jwt.sign({ id: userData.id }, jwtConfig.secret)
      const user = { ...userData }
      delete user.password
      const response = { accessToken }

      return [200, response]
    }

    return [200, { error }]
  } else {
    return [401, { error: 'Invalid Data' }]
  }
})
mock.onGet('/auth/me').reply(config => {
  // ** Get token from header
  // @ts-ignore
  const token = config.headers.Authorization
  // ** Default response
  let response = [200, {}]

  // ** Checks if the token is valid or expired
  jwt.verify(token, jwtConfig.secret, (err, decoded) => {
    // ** If token is expired
    try{  
      
      if (err===null) {
        // ** If onTokenExpiration === 'logout' then send 401 error
        if (defaultAuthConfig.onTokenExpiration === 'logout') {
          // ** 401 response will logout user from AuthContext file
          response = [401, { error: { error: 'Invalid User' } }]
        } else {
          // ** If onTokenExpiration === 'refreshToken' then generate the new token
          const oldTokenDecoded = jwt.decode(token, { complete: true })
          // ** Get user id from old token
          // @ts-ignore
          const { id: userId } = oldTokenDecoded.payload
          
          //****CODIGO ORIGINAL QUE ACTUALIZA Y CIERRA SESION****************** */
          // ** Get user that matches id in token
          //const user = users.find(u => u.id === userId)
          //******************************************************************* */
        
          //****CODIGO QUE ACTUALIZA Y NO CIERRA SESION************************* */
          //Recuperar los datos de inicio de sesión de localStorage
          const loginDataString = localStorage.getItem('userData');
          
          if(loginDataString !==null)
          {
          // alert(loginDataString)
          // Convertir la cadena de datos de inicio de sesión a un objeto JavaScript
          const users = JSON.parse(loginDataString);

          // // Buscar al usuario que coincide con userId
           const user = users.find(u => u.id === userId);
          //******************************************************************** */
      
          // ** Sign a new token CREA EL TOKEN CON TIEMPO DE EXPIRACION
          // const accessToken = jwt.sign({ id: userId }, jwtConfig.secret, {
          //   expiresIn: jwtConfig.expirationTime
          // })
          // CREA EL TOKEN SIN TIEMPO DE EXPIRACION   
          const accessToken = jwt.sign({ id: userId }, jwtConfig.secret)
          // ** Set new token in localStorage
          window.localStorage.setItem(defaultAuthConfig.storageTokenKeyName, accessToken)
          const obj = { userData: { ...user, password: undefined } }
          // ** return 200 with user data
          response = [200, obj]
          }
        }
      } else {
        // ** If token is valid do nothing
        // @ts-ignore
        const userId = decoded.id
        
        // ** Get user that matches id in token
        const userData = JSON.parse(JSON.stringify(users.find(u => u.id === userId)))
        delete userData.password

        // ** return 200 with user data
        response = [200, { userData }]
      }
    } catch(e) {
      //console.log("error: "+e)
      toast.success('Sesion finalizada', {
        position: "top-center",
      })
      localStorage.removeItem('userData')
      localStorage.removeItem('accessToken')
      // window.location.replace('/login/')
    }
  })
  return response
})


