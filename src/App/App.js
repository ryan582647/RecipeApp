import React from 'react';
import { withRouter, Route, Switch, Link, Redirect } from 'react-router-dom'
import RecipeSearch from '../searchbar/RecipeSearch'
import RecipeResults from '../searchbar/RecipeResults'
import RecipePage from '../searchbar/RecipePage'
import HomePage from '../HomePage/HomePage'
import Header from '../HomePage/Header'
import SavedRecipes from '../SavedRecipes/SavedRecipes'
import AuthApiService from '../services/login-service'
import TokenService from '../services/token-service'
import './App.css'
import Login from '../LoginPage/Login'
import CreateAccount from '../CreateAccount/CreateAccount';

class App extends React.Component {
   
    
 constructor(props){
     super(props)
     this.state = {
         categories: [],
         recipes: [],
         meal: [],
         error: '',
         isLoggedIn: false
     }

     this.handleClick = this.handleClick.bind(this)
     this.handleSubmit = this.handleSubmit.bind(this)
     this.handleSave = this.handleSave.bind(this)
     this.handleUserLogin = this.handleUserLogin.bind(this)
     this.handleSignOut = this.handleSignOut.bind(this)

 }

 handleUserLogin = ev => {
    ev.preventDefault()
    console.log("we made ittt")
    const { username, password } = ev.target
    console.log(username, password)

  AuthApiService.postLogin({
    username: username.value,
    password: password.value,
  })
  .then(res => {
    console.log("made it to res")
    username.value = ''
    password.value = ''
    TokenService.saveAuthToken(res.authToken)
    this.setState({isLoggedIn : true , error: ''})
  })
  .catch(res => {
    this.setState({ error:res.error })
  })

  }

  handleSignOut(){
      TokenService.clearAuthToken()
      this.setState({ isLoggedIn: false })
  }

 handleClick(id){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            console.log("I have the data")
            this.setState({meal: data})
          })
          .catch(error => {throw new Error(error.message)})
          ;
 }

 handleSave(save) {
     console.log(save)
 }


 handleSubmit(value){
    this.setState({recipes: []});
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${value}`)
          .then(response=> response.json())
          .then(data => {
              console.log(data)
              console.log("I have the data")
              
              this.setState({recipes: data})
            })
            .catch(error => {throw new Error(error.message)})
            ;
  
  }

 componentDidMount(){
    
    TokenService.clearAuthToken()
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
        .then(response=> response.json())
        .then(data => {
            this.setState({categories: data})})
            .catch(error => {throw new Error(error.message)})
            ;
    }

render() {
    const { categories } = this.state;
    return (
        <div>
         <nav role="navigation">
            {this.state.isLoggedIn && <Link to="/saved"><span className="nav-buttons saved-recipes">Your Recipes</span></Link>}
            {!this.state.isLoggedIn && <Link to="/create-account"><span className="nav-buttons create-account">Create Account</span></Link>}
            <Link to="/"><span className="nav-buttons">Home</span></Link>
            {this.state.isLoggedIn ? <Link to="/"> <span className="logout nav-buttons" onClick={this.handleSignOut}>Sign Out</span></Link> : <Link to="/login"><span className="login">Sign in</span></Link>}
             
            {this.state.isLoggedIn && <Redirect to="/" />}
         </nav>
         <section>
            <Route exact path="/" component={Header} />
            <RecipeSearch  categories={categories} onSubmit={this.handleSubmit} />
            <Switch>{/* placed here for clarity */}
                
                <Route exact path="/results" render={(props) => <RecipeResults {...props} results={this.state.recipes} onClick={this.handleClick} />}/>
                <Route exact path="/meal" render={(props) => <RecipePage {...props} results={this.state.meal} isLoggedIn={this.state.isLoggedIn} handleSave={this.handleSave}/>}/>
                <Route exact path="/saved" component={SavedRecipes} />
                <Route exact path="/" component={HomePage} />
                
                <Route exact path="/create-account" component={CreateAccount}/>
                <Route exact path="/login" render={(props) => <Login {...props} handleLogin={this.handleUserLogin} error={this.state.error}/>}/>
            </Switch>  
          </section>
    
      
        <footer role="contact-info"><a className="nav-buttons" target="_blank" href="https://github.com/ryan582647/">LinkedIn</a></footer>
     </div>   
    );
}}

export default withRouter(App);

