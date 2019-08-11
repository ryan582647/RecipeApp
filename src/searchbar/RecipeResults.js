import React from 'react';
import RecipePage from './RecipePage'

class RecipeResults extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          id: ' ',
          recipe: []
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(event){
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${event.target.id}`)
            .then(response => response.json())
            .catch(error => {throw new Error(error.message)})
            .then(data => {
                console.log(data)
                console.log("I have the data")
                this.setState({recipe: data})
              });
              event.preventDefault();
    }
    
     resultsMap(){
        const resultsList = this.props.results.meals;
        let resultsArray = []


        if (resultsList) {
          resultsList.map((res) =>{

          resultsArray.push(<div>
              <p>{res.strMeal}</p>
              <img src={res.strMealThumb} />
              <button id={res.idMeal} onClick={this.handleClick}>Gib Food Pls</button>
          </div>)
         }
        )
      }
        return resultsArray;
      }

render() {
    return (
     <div>
         <RecipePage recipe={this.state.recipe}/>      
         {this.resultsMap()} 
     </div>   
    )
}
}

export default RecipeResults

