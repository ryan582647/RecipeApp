import React from 'react';
import { Link } from 'react-router-dom'
import TokenService from '../services/token-service'
import './SavedRecipes.css'


class SavedRecipes extends React.Component {
constructor(props){
    super(props)
    this.state = {
        recipes: [] ,
        showDetails: false,
        selectedRecipeId: 0
    }
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.savedResultsPage = this.savedResultsPage.bind(this);
    this.recipePhotoLink = this.recipePhotoLink.bind(this);
}

deleteRecipe (e){
    e.preventDefault();
    let recipeID = parseInt(e.target.id)
    let token = TokenService.getAuthToken();
  
    fetch(`http://localhost:8000/api/recipes/${recipeID}`, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`
    }

  })
    .then(res => {
      if (!res.ok) {
        return res.json().then(error => {
          throw new Error(error)
        })
      }
      return res
    })
    .then(res => {
        this.setState({recipes: this.state.recipes.filter((i) => i.id !== recipeID)})
    })
    .catch(error => {
      console.error(error)
    })
}


componentDidMount() {
  let token = TokenService.getAuthToken();

    fetch('http://localhost:8000/api/recipes', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
      
    })
    .then(response=> response.json())
    .then(data => {
        console.log("I have the data for Saved Recipes")
        this.setState({recipes: data})})
        .catch(error => {throw new Error(error.message)})
        ;
}

savedResultsMap(){
    const resultsList = this.state.recipes;
    let resultsArray = []


    if (resultsList) {
      resultsList.map((res) =>{

      resultsArray.push(<div className="saved-list">
          <p>{res.recipe_title}</p>
          <img alt='' id={res.id} src={res.picture} onClick={this.recipePhotoLink} className="recipe-photo"/>
          <Link to="/"><button id={res.id} onClick={this.deleteRecipe}>Delete</button></Link>
      </div>)
     }
    )
  }
    return resultsArray;
  }

recipePhotoLink(event){
  this.setState({ showDetails: true, selectedRecipeId: parseInt(event.target.id)})
}
savedResultsPage (){
     const recipes = this.state.recipes
     const selectedRecipe = recipes.filter(recipe => recipe.id === this.state.selectedRecipeId)[0];
     console.log(selectedRecipe)
     return <div>Details here</div>
}

     
render() {
  console.log("in saved recipes")
    return (
    <div>
       {this.state.showDetails ? this.savedResultsPage() : this.savedResultsMap()}
    </div>
    )
}
}



export default SavedRecipes;