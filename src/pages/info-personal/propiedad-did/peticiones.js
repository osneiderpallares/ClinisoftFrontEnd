import axios from 'axios'

//const baseUrl = process.env.REACT_APP_BASE_URL

const baseURL_GET = 'http://127.0.0.1:8000/get_prodid/'

const baseURL_POST = 'http://127.0.0.1:8000/store_prodid/'

const baseURL_UPDATE = 'http://127.0.0.1:8000/update_prodid/'

export async function savePropiedadDid(dataPropiedadDid) {
  try {
    const formData = new FormData()
    if (dataPropiedadDid.id) {
      formData.append('id', dataPropiedadDid.id)
    }
    formData.append('nombre', dataPropiedadDid.nombre)
    formData.append('abreviacion', dataPropiedadDid.abreviacion)
    formData.append('estado', dataPropiedadDid.estado)

    const response = await axios({
      url: baseURL_POST,
      method: 'POST',
      data: formData
    })

    return response.data
  } catch (e) {
    console.log(e)

    return ''
  }
}

export async function deletePropiedadDid(id) {
  try {
    await axios({
      url: baseURL_UPDATE + id,
      method: 'GET'
    })

    return true
  } catch (e) {
    console.log(e)

    return false
  }
}

export async function getPropiedadDid(id) {
  try {
    const response = await axios({
      url: baseURL_GET + id,
      method: 'GET'
    })

    return response.data
  } catch (e) {
    console.log(e)

    return e
  }
}
