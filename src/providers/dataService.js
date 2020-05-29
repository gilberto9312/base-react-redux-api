import config from 'config/enviroment'
import { DisplayMessage } from 'notifications/displayMessage'
import { StorageService } from 'utils/storage'

export class DataService {
  post(endpoint, body) {
    let trama = {
      headerIn: this.headerIn(),
      bodyIn: body
    }
    const requestOptions = {
      method: 'POST',
      headers: this.header(),
      body: JSON.stringify(trama)
    }
    let api_endpoint = config.api + endpoint
    return fetch(api_endpoint, requestOptions).then(this.handleResponse)
  }
  postCors(endpoint, body) {
    let trama = {
      headerIn: this.headerIn(),
      bodyIn: body
    }
    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: this.headerWithoutJSON(),
      body: JSON.stringify(trama)
    }
    let api_endpoint = config.api + endpoint
    return fetch(api_endpoint, requestOptions).then(this.handleResponse)
  }

  postMultipart(endpoint, body, files) {
    let trama = {
      headerIn: this.headerIn(),
      bodyIn: body
    }

    var formData = new FormData()
    formData.append('json', JSON.stringify(trama))
    files.map((file, index) => {
      formData.append('file' + index, file)
      return 0
    })

    const requestOptions = {
      method: 'POST',
      body: formData
    }

    let api_endpoint = config.api + endpoint

    return fetch(api_endpoint, requestOptions).then(this.handleResponse)
  }

  header() {
    let header = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
    return header
  }
  headerWithoutJSON() {
    let header = {
      'Content-Type': 'application/json'
    }
    return header
  }

  headerIn() {
    let token = new StorageService().getSession()
    let headerIn = config.headerIn
    if (token) {
      headerIn.token = token
    }

    return headerIn
  }

  handleResponse(response) {
    if (!response.ok) {
      messageStatusCode(response.clone())
      throw response
    } else {
      let is_blob = false
      let is_html = false
      response.headers.forEach(function (val, key) {
        if (key === 'content-disposition') is_blob = true

        if (val.indexOf('text/html') !== -1) is_html = true
      })

      if (is_blob || is_html) {
        return response
      } else {
        messageStatusCode(response.clone())
        return response.json().then((data) => {
          return data
        })
      }
    }
  }
}

function messageStatusCode(response) {
  let code = response.status
  let error = false
  let displayMessage = new DisplayMessage()
  switch (code) {
    case 200:
      response.json().then((data) => {
        if (data.error && data.error.codigo !== '0') {
          if (data.error.mensaje) {
            displayMessage.error(data.error.mensaje)
          }
        }
      })
      break
    case 502:
      error = true
      displayMessage.error('Connection refused')
      break
    case 500:
      error = true
      displayMessage.error('Internal Error Server')
      response.json().then((data) => {
        console.log(
          '****************ERROR 500 LANZADO POR EL BACKEND**************************'
        )
        console.log(data)
        console.log(
          '****************ERROR 500  LANZADO POR EL BACKEND**************************'
        )
      })
      break
    case 405:
      error = true
      displayMessage.error('Failed to load resource')
      break
    case 404:
      error = true
      displayMessage.error('Page not Found')
      break
    default:
      error = true
      displayMessage.error('Page not Found')
  }
  return error
}
