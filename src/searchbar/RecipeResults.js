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
    }

  /*  handleClick(event){
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${event.target.id}`)
            .then(response => response.json())
            .catch(error => {throw new Error(error.message)})
            .then(data => {
                console.log(data)
                console.log("I have the data")
                this.setState({recipe: data})
              });
              event.preventDefault();
    } */
    
    handleMealClick(event) {
       this.setState({ id: event.target.id})
       const { onClick } = this.props

       onClick(this.state.id)
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

