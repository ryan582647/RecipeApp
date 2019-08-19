import React from 'react';

class CreateAccount extends React.Component {

 
     
render() {
    return (
    <div>
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
				<label for="password">Confirm Password</label>
				<input type="password" name="password" placeholder="password" required />
            </li>
			<li>
				<input type="submit" value="Create Account" />
			</li>
		</ul>
	        </form>
    </div>
    )
}
}

export default CreateAccount;