import React from 'react';
import AuthApiService from '../services/login-service'
import TokenService from '../services/token-service'
class Login extends React.Component {
	constructor(props){
		super(props)

		this.onLogin = this.onLogin.bind(this)
	}

	onLogin(event) {
	   event.preventDefault();
	   console.log("We made it in onLogin")
	  const { handleLogin } = this.props
	  handleLogin(event);
	  }
 
     
render() {
    return (
    <div>
      <body>
        <div class="loginform cf">
	        <form name="login" onSubmit={this.onLogin}>
		<ul>
			<li>
				<label for="usermail">Email</label>
				<input type="email" name="username" placeholder="yourname@email.com" required />
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