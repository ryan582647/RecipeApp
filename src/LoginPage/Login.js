import React from 'react';

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
	console.log("error for login", this.props.error)
    return (
    <div>
        <div className="loginform cf">
	        <form name="login" onSubmit={this.onLogin}>
		<ul>
			<li>
				<label htmlFor="usermail">Email</label>
				<input type="email" name="username" placeholder="yourname@email.com" required />
			</li>
			<li>
				<label htmlFor="password">Password</label>
				<input type="password" name="password" placeholder="password" required />
            </li>
			<li>
				<input type="submit" value="Login" />
			</li>
		</ul>
	        </form>
        </div>
		{(this.props.error !== '') && <div className="login-error">{this.props.error}</div>}
    </div>
    )
}
}

export default Login;