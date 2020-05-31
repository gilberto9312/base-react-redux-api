import React from 'react'
import { connect } from 'react-redux'
import { Boton } from '../../component/boton'
import Page from '../../component/page'
import { useDispatch } from 'react-redux'
import { login } from '../../actions/sessionActions'

const Home = (props) => {
  const { user } = props
  const NODE_ENV = process.env.REACT_APP_LLAVE_UNO
  console.log(NODE_ENV)
  const dispatch = useDispatch()
  const handleDispatch = () => {
    dispatch(login())
  }
  return (
    <Page className={'home'} title="Home">
      desde redux : {user.session.user.first_name}
      <Boton text={'clic me'} touch={handleDispatch} />
    </Page>
  )
}

const mapStateToProps = (state) => ({
  user: state
})
export default connect(mapStateToProps)(Home)
