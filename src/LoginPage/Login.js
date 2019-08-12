import React from 'react';

class Login extends React.Component {

 
     
render() {
    return (
    <div>
      <body>
        <div class="loginform cf">
	        <form name="login" action="index_submit" method="get" accept-charset="utf-8">
		<ul>
			<li>
				<label for="usermail">Email</label>
				<input type="email" name="usermail" placeholder="yourname@email.com" required />
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