import axios from 'axios'

//const baseUrl = process.env.REACT_APP_BASE_URL

// const baseURL_SHOW = 'http://127.0.0.1:8000/show_prodid/'

// const baseURL_GET = 'http://127.0.0.1:8000/get_prodid/'

const endPoint = 'http://127.0.0.1:8000'

export async function saveRow(data, url) {
  try {
    const formData = new FormData()
    if (data.id) {
      formData.append('id', data.id)
    }

    Object.keys(data).forEach(e => {
      if (e != 'id') formData.append(e, data[e])
    })
    
    await axios({
      url: endPoint + url,
      method: 'POST',
      data: formData
    })
    return true
  } catch (e) {
    console.log("error "+e)

    return false
  }
}

export async function deleteRow(id, url) {
  try {
    await axios({
      url: endPoint + url + id,
      method: 'GET'
    })

    return true
  } catch (e) {
    //console.log(e)

    return false
  }
}

export async function get(id, url) {
  try {
    const response = await axios({
      url: endPoint + url + id,
      method: 'GET'
    })

    return response.data
  } catch (e) {
    //console.log(e)

    return ''
  }
}

export async function show(url) {
  try {
    await axios.get(endPoint + url).then(response => {
      console.log(response.data)

      return response.data
    })
  } catch (e) {
    //console.log(e)

    return ''
  }
}
