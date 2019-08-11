import React from 'react';

class RecipePage extends React.Component {

 recipeMap(){
 const recipeContent = this.props.recipe.meals;
    let recipeArray = []


        if (recipeContent) {
            recipeContent.map((res) =>{

            recipeArray.push(<div>
              <form>
              <p>{res.strMeal}</p>
              <p>Region: {res.strArea}</p>
              <p>{res.strInstructions}</p>
              <p>{res.strIngredient1}</p>
              <p>{res.strIngredient2}</p>
              <p>{res.strIngredient3}</p>
              <p>{res.strIngredient4}</p>
              <p>Can't read? Don't wanna read?</p>
              <video width="120" height="80" controls>
                  <source src={res.strYoutube} />
               </video>
              <button>Save</button>
              </form>
          </div>)
         }
        )
      }
        return recipeArray;
    }
     
render() {
    console.log(this.props)
    return (
     <div>
         {this.recipeMap()}
     </div>   
    )
}
}

export default RecipePage;