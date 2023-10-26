import React, { useState, useEffect } from 'react'
import axios from 'axios'

//import React from 'react'

const baseURL = 'http://127.0.0.1:8000/api/login/'

const AdmisionPage = () => {
  const [rows, setRows] = useState(null)
  useEffect(() => {
    axios.get(baseURL).then(response => {
      console.log(response.data)
      setRows(response.data)
    })
  }, [setRows])

  if (!rows) return null

  return (
    <div className='App'>
      <div>
        <table border='1'>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Nombre de usuario</th>
            </tr>
          </thead>
          {rows.map(item => (
            <div key={item.id}>
              <tbody>
                <tr>
                  <td>{item.nombre}</td>
                  <td>{item.nombre_usuario}</td>
                </tr>
              </tbody>
            </div>
          ))}
        </table>
      </div>
    </div>
  )
}

AdmisionPage.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default AdmisionPage
