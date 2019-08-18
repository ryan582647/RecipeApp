import React from 'react';
import {Route, Link } from 'react-router-dom'
import RecipePage from './RecipePage'

class RecipeResults extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          id: ' ',
          recipe: []
        }
        this.handleMealClick = this.handleMealClick.bind(this);
    }

    
    handleMealClick(event) {
       this.setState({ id: event.target.id})
       const { onClick } = this.props

       onClick(event.target.id)
    }

     resultsMap(){
        console.log(this.props.results)
        const resultsList = this.props.results.meals;
        let resultsArray = []


        if (resultsList) {
          resultsList.map((res) =>{

          resultsArray.push(<div>
              <p>{res.strMeal}</p>
              <img src={res.strMealThumb} />
              <Link to="/meal"><button id={res.idMeal} onClick={this.handleMealClick}>Gib Food Pls</button></Link>
          </div>)
         }
        )
      }
        return resultsArray;
      }

render() {
    return (
     <div>
         {this.resultsMap()} 
     </div>   
    )
}
}

export default RecipeResults

