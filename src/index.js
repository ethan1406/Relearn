import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/Login';
import Menu from './components/Menu';
import FriendList from './components/FriendList';

import axios from 'axios';
//redux stuff
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers/userReducer';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

import thunk from 'redux-thunk';


axios.get('/api/userData').then(resp => {


	console.log(resp.data);

	const store = createStore(reducers, resp.data, applyMiddleware(thunk));

	ReactDOM.render(
		<Provider store = {store} >
			<BrowserRouter>
				<div>
					<Menu />
					<Switch>
						<Route exact={true} path="/" component={FriendList}/>
						<Route path="/login" component={Login}/>
						<Route path="/friendList" component={FriendList}/>
					</Switch>
				</div>
			</BrowserRouter>
		</Provider>
		,
		document.getElementById('root')
	);
});




