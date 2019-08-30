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
    <div className="login-form">
        <div className="loginform cf">
	        <form name="login" onSubmit={this.onLogin}>
			<div>
				<label className="login-label" htmlFor="usermail">Email</label>
				<input className="login-input" type="email" name="username" placeholder="yourname@email.com" required />
			</div>
			<div>
				<label className="login-label" htmlFor="password">Password</label>
				<input className="login-input" type="password" name="password" placeholder="password" required />
            </div>
			<div>
				<input className="login-button" type="submit" value="Login" />
				{(this.props.error !== '') && <div className="login-error">{this.props.error}</div>}
			</div>
	        </form>
        </div>
    </div>
    )
}
}

export default Login;