import React from 'react';

class CreateAccount extends React.Component {

handleCreate(user) {
        return fetch(`${config.API_ENDPOINT}/users`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(user),
        })
          .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          )
      }

     
render() {
    return (
    <div>
   <form name="login" action="index_submit" method="get" accept-charset="utf-8">
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
				<input type="submit" value="Create Account" onSubmit={this.handleCreate}/>
			</li>
		</ul>
	        </form>
    </div>
    )
}
}

export default CreateAccount;