import React from 'react'
import { connect } from 'react-redux'
import { Boton } from '../../component/boton'
import Page from '../../component/page'

const Home = (props) => {
  const { user } = props
  const NODE_ENV = process.env.REACT_APP_LLAVE_UNO
  console.log(NODE_ENV)
  return (
    <Page className={'home'} title="Home">
      desde redux : {user.session.user.first_name}
      <Boton text={'clic me'} touch={() => alert('hola')} />
    </Page>
  )
}

const mapStateToProps = (state) => ({
  user: state
})
export default connect(mapStateToProps)(Home)
