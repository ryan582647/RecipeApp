import React from 'react';
import AuthApiService from './login-service'
import TokenService from './token-service'
class Login extends React.Component {

	handleSubmitJwtAuth = ev => {
		ev.preventDefault()
		this.setState({ error: null })
		const { user_name, password } = ev.target
	
	  AuthApiService.postLogin({
		user_name: user_name.value,
		password: password.value,
	  })
	  .then(res => {
		user_name.value = ''
		password.value = ''
		TokenService.saveAuthToken(res.authToken)
		this.props.onLoginSuccess()
	  })
	  .catch(res => {
		this.setState({ error:res.error })
	  })
	
	  }
 
     
render() {
    return (
    <div>
      <body>
        <div class="loginform cf">
	        <form name="login" action="index_submit" method="get" accept-charset="utf-8" onSubmit={this.handleSubmitJwtAuth}>
		<ul>
			<li>
				<label for="usermail">Email</label>
				<input type="email" name="user_name" placeholder="yourname@email.com" required />
			</li>
			<li>
				<label for="password">Password</label>
				<input type="password" name="password" placeholder="password" required />
            </li>
			<li>
				<input type="submit" value="Login" />
			</li>
		</ul>
	        </form>
        </div>
      </body>
    </div>
    )
}
}

export default Login;