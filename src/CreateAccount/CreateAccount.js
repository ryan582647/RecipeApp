import React from 'react';
import AuthApiService from '../services/login-service'
import { Redirect } from 'react-router-dom'


class CreateAccount extends React.Component {

constructor(props){
  super(props)
  this.state = {
    error: '',
    isRedirect: false
  }
}

handleCreate = e => {
  e.preventDefault()
  const { username, password, confirmPassword} = e.target

  AuthApiService.postUser({
    username: username.value,
    password: password.value,
    confirmPassword: confirmPassword.value
  })
    .then(user => {
      username.value = ''
      password.value = ''
      confirmPassword.value = ''
      this.setState({ error : ''})
      this.setState({ isRedirect: true})
      alert("account created!")
    })
    .catch(res => {
      this.setState({ error: res.error })
    })
}

     
render() {
    return (
  <div className="loginform">
    <form name="login" onSubmit={this.handleCreate} >
			<div>
				<label className="login-label" for="usermail">Email</label>
				<input className="login-input" type="email" name="username" placeholder="yourname@email.com" required />
			</div>
			<div>
				<label className="login-label" for="password">Password</label>
				<input className="login-input" type="password" name="password" placeholder="password" required />
      </div>
      <div>
				<label className="login-label" for="password">Confirm Password</label>
				<input className="login-input" type="password" name="confirmPassword" placeholder="confirm password" required />
      </div>
			<div>
				<input className="create-account-button" type="submit" value="Create Account"/>
        {(this.state.error !== '') && <div className="login-error">{this.state.error}</div>}
        {this.state.isRedirect && <Redirect to='/' />}
			</div>
	   </form>
  </div>
    )
}
}

export default CreateAccount;