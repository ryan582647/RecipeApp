import React from 'react';
import { Route, Switch, Link } from 'react-router-dom'
import RecipeSearch from '../searchbar/RecipeSearch'
import RecipeResults from '../searchbar/RecipeResults'
import RecipePage from '../searchbar/RecipePage'
import HomePage from '../HomePage/HomePage'
import Header from '../HomePage/Header'
import SavedRecipes from '../SavedRecipes/SavedRecipes'
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
     }
     this.handleClick = this.handleClick.bind(this)
     this.handleSubmit = this.handleSubmit.bind(this)
     this.handleSave = this.handleSave.bind(this)

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
        fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
        .then(response=> response.json())
        .then(data => {
            console.log("I have the data")
            this.setState({categories: data})})
            .catch(error => {throw new Error(error.message)})
            ;
    }

render() {
    //console.log("inside render for App")
    const { categories } = this.state;
    //console.log(categories)
    return (
    <div>
    <nav role="navigation">
    <Link to="/saved"><span>Your Recipes</span></Link>
    <Link to="/create-account"><span>Create Account</span></Link>
    <Link to="/">HomeTest</Link>
    Nav 
    <Link to="/login"><span className="login">Sign in</span></Link>
    <Switch>
    <Route exact path="/login" component={Login}/>
    <Route exact path="/saved" component={SavedRecipes} />
    <Route exact path="/create-account" component={CreateAccount}/>
    </Switch>
    </nav>
        <section>
        <Route exact path="/" component={Header} />
        <RecipeSearch  categories={categories} onSubmit={this.handleSubmit} />
        <Switch>
        <Route exact path="/results" render={(props) => <RecipeResults {...props} results={this.state.recipes} onClick={this.handleClick} />}/>
        <Route exact path="/meal" render={(props) => <RecipePage {...props} results={this.state.meal} handleSave={this.handleSave}/>}/>

        </Switch>  
        </section>
    
        <section>
        <Route exact path="/" component={HomePage} />
        </section>
        <footer role="contact-info">My contacts here</footer>
     </div>   
    );
}}

export default App;

