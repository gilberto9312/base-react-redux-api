import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App.jsx'
import { createStore } from 'redux'
import { createBrowserHistory as createHistory } from 'history'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router' // react-router v4/v5
//import { ConnectedRouter } from 'react-router-redux'
import { ConnectedRouter } from 'connected-react-router'
import { BrowserRouter as Router} from 'react-router-dom'
import configureStore, { history } from './configureStore'


const store = configureStore(
		state=>state
	)

ReactDOM.render((
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<Router>
	                <Route path="/" component={App}/>
	            </Router>
			</ConnectedRouter>
		</Provider>
		),document.getElementById('root'));