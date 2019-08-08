import React from 'react';

class RecipeResults extends React.Component {
   
    constructor(props){
        super(props);
       /* this.state = {
          meal: '',
          mealPicture: '',
          mealItemID: ''
        }*/
    }    
    resultsMap(){
        const resultsList = this.props.results.meals;
        let resultsArray = []
        if (resultsList) {
          resultsList.map((res) =>{
          resultsArray.push(<div>
              <p>{res.strMeal}</p>
              <img src={res.strMealThumb} />
          </div>)
        })
      }
        return resultsArray;
      }


 componentDidMount(){

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

