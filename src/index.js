import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/Login';
import Menu from './components/Menu';
import FriendList from './components/FriendList';

import {BrowserRouter, Route, Switch} from 'react-router-dom';


ReactDOM.render(
	<BrowserRouter>
		<div>
			<Menu />
			<Switch>
				<Route exact path="/" component={FriendList}/>
				<Route path="/login" component={Login}/>
				<Route path="/friendList" component={FriendList}/>
			</Switch>
		</div>
	</BrowserRouter>
	,
	document.getElementById('root')
);
