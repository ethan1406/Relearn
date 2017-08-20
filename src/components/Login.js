import React, { Component } from 'react';


class Login extends Component {



	render() {
		return (
		<div>
			<div className="absoluteWrapper">
				<table className="loginForm">
					<tbody>
						
						<tr>
							<th>Sign In</th>
						</tr>
						<tr>
							<td className="input-group">
							<span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
							<input id="email" className="form-control" type="text"
								name="email" placeholder="Email" />
							</td>
						</tr>
						<tr>
							<td className="input-group">
							<span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
							<input id="password" className="form-control"
								type="password" name="password" placeholder="Password" />
							</td>
						</tr>
						<tr>
							<td><button id="login" className="animatedButton">LOG
									IN</button></td>

						</tr>
						<tr>
							<td><a id="create-account-link" href="signup.html">New User? Create an account</a></td>
						</tr>
						<tr>
							<td>Login or Register with:</td>
						</tr>
						<tr>
							<td><div className="fb-login-button" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="true" data-auto-logout-link="false" data-use-continue-as="false"></div></td>
						</tr>	
						<tr>
							<td><a id="fbButton" href="/auth/facebook"><span className="fa fa-facebook"></span>Login with Facebook</a></td> 
						</tr>					
					</tbody>	
				</table>
			</div>
		</div>
	
		);
	}
}


export default Login;