const headerIn = {
  dispositivo: null,
  canal: null,
  medio: null,
  aplicacion: null,
  tipoTransaccion: null,
  usuario: null,
  uuid: null,
  fechaHora: null,
  idioma: null,
  empresa: null,
  geolocalizacion: null,
  token: ''
}
let url = 'localhost/api'
const config = {
  api: url,
  headerIn: headerIn
}

export default config
