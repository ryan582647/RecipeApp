import React from 'react';
import AuthApiService from '../services/login-service'


class CreateAccount extends React.Component {

handleCreate = e => {
  e.preventDefault()
  const { username, password } = e.target

  AuthApiService.postUser({
    username: username.value,
    password: password.value
  })
    .then(user => {
      username.value = ''
      password.value = ''
    })
    .catch(res => {
      this.setState({ error: res.error })
    })
}

     
render() {
    return (
    <div>
   <form name="login" onSubmit={this.handleCreate} >
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
				<label for="password">Confirm Password</label>
				<input type="confirm-password" name="confirm-password" placeholder="confirm-password" required />
            </li>
			<li>
				<input type="submit" value="Create Account"/>
			</li>
		</ul>
	        </form>
    </div>
    )
}
}

export default CreateAccount;