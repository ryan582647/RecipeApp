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
    this.revertList = this.revertList.bind(this);
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
        this.setState({recipes: data})})
        .catch(error => {throw new Error(error.message)});
}

savedResultsMap(){
    const resultsList = this.state.recipes;
    let resultsArray = []


    if (resultsList) {
      resultsList.map((res) =>{

      resultsArray.push(<div className="saved-list">
          <p>{res.recipe_title}</p>
          <img alt='' id={res.id} src={res.picture} onClick={this.recipePhotoLink} className="recipe-photo"/>
          <Link to="/"><button className="saved-recipes-button" id={res.id} onClick={this.deleteRecipe}>Delete</button></Link>
      </div>)
     }
    )
  }
    return resultsArray;
  }

recipePhotoLink(event){
  this.setState({ showDetails: true, selectedRecipeId: parseInt(event.target.id)})
}
revertList(){
  this.setState({ showDetails: false})
}

savedResultsPage (){
     const recipes = this.state.recipes
     const selectedRecipe = recipes.filter(recipe => recipe.id === this.state.selectedRecipeId)[0];
     let ingredients = selectedRecipe.ingredients.split(',')
     let list = ingredients.map(ingredient =>{
        if (ingredient !== '' && ingredient !== 'null'){
          return <li>{ingredient}</li>
        }
     })
     return  <div>
     <p name="recipe-title" value={selectedRecipe.recipe_title}>{selectedRecipe.recipe_title}</p>
     <img alt='A picture of the completed recipe.' name="recipe-picture" value={selectedRecipe.picture} src={selectedRecipe.picture} />
     <p name="recipe-region" value={selectedRecipe.region}>Region: {selectedRecipe.region}</p>
     <p name="recipe-instructions"  value={selectedRecipe.instructions}>{selectedRecipe.instructions}</p>
     <div>Ingredients</div>
     <ul name="recipe-ingredients">
       {list}
     </ul>

     <p>Can't read? Don't wanna read?</p>
     <iframe width="420" height="345" src={selectedRecipe.video}>
     </iframe>
      <button className="saved-recipes-button" type="submit" onClick={this.revertList}>Back to your list </button>
 </div>
}

     
render() {
    return (
    <div>
       {this.state.showDetails ? this.savedResultsPage() : this.savedResultsMap()}
    </div>
    )
}
}



export default SavedRecipes;