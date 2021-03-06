import React from 'react';
import TokenService from '../services/token-service'
import './RecipePage.css'

class RecipePage extends React.Component {

constructor(props){
  super(props)
  this.state = {
    saveError: "Please sign in to save a recipe.",
    saveSuccess: false
  }
}
 
handleRecipeSave = e => {
 
        e.preventDefault();
        let content = this.props.results.meals[0];
        let token = TokenService.getAuthToken();
        let videoURL = ""        
        console.log("YT url ", content.strYoutube)

        if (content.strYoutube !== "" && content.strYoutube.length > 5) {
        let videoData = content.strYoutube.split("?")
        let videoNumber = videoData[1].split("=")
        console.log("Video id ", videoNumber)
        videoURL = "https://www.youtube.com/embed/" + videoNumber[1]
        }


            const newRecipe = {
                id: content.idMeal,
                recipe_title: content.strMeal,
                picture: content.strMealThumb,
                region: content.strArea,
                instructions: content.strInstructions,
                video: videoURL,
                ingredients: content.strIngredient1 + ',' + content.strIngredient2 + ','  +
                content.strIngredient3 + ',' + content.strIngredient4 + ','  +
                content.strIngredient5 + ',' + content.strIngredient6 + ','  +
                content.strIngredient7 + ',' + content.strIngredient8 + ','  +
                content.strIngredient9 + ',' + content.strIngredient10 + ','  +
                content.strIngredient11 + ',' + content.strIngredient12 + ',' +
                content.strIngredient13 + ',' + content.strIngredient14 + ',' +
                content.strIngredient15 + ',' + content.strIngredient16 + ',' +
                content.strIngredient17 + ',' + content.strIngredient18 + ',' +
                content.strIngredient19 + ',' + content.strIngredient20 
            }
    fetch(`https://safe-sands-81610.herokuapp.com/api/recipes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization' : `Bearer ${token}`

      },
      body: JSON.stringify(newRecipe),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .catch(error => {
        console.error({ error })
      })
      
      this.setState({ saveSuccess: true})
      setTimeout(save => this.setState({ saveSuccess: false}), 3000);

}
    
 recipeMap(){
 const recipeContent = this.props.results.meals;
 console.log(recipeContent)
    let recipeArray = []

        if (recipeContent) {
            recipeContent.map((res) =>{ 
              let videoURL = "" ;
              if (res.strYoutube !== "" && res.strYoutube.length > 5) {
                let videoData = res.strYoutube.split("?")
                let videoNumber = videoData[1].split("=")
                console.log("Video id ", videoNumber)
                videoURL = "https://www.youtube.com/embed/" + videoNumber[1]
                }
            
            let recipeHTML = <div>
            <p name="recipe-title" value={res.strMeal}>{res.strMeal}</p>
            <img alt='A picture of the completed recipe.' className="recipe-picture" name="recipe-picture" value={res.strMealThumb} src={res.strMealThumb} />
            <p name="recipe-region" value={res.strArea}>Region: {res.strArea}</p>
            <p name="recipe-instructions"  value={res.strInstructions}>{res.strInstructions}</p>
            <ul name="recipe-ingredients"  value={res.strIngredient1} >
            {res.strIngredient1 !== '' && <li>{res.strIngredient1}</li>}
            {res.strIngredient2 !== '' && <li>{res.strIngredient2}</li>}
            {res.strIngredient3 !== '' && <li>{res.strIngredient3}</li>}
            {res.strIngredient4 !== '' && <li>{res.strIngredient4}</li>}
            {res.strIngredient5 !== '' && <li>{res.strIngredient5}</li>}
            {res.strIngredient6 !== '' && <li>{res.strIngredient6}</li>}
            {res.strIngredient7 !== '' && <li>{res.strIngredient7}</li>}
            {res.strIngredient8 !== '' && <li>{res.strIngredient8}</li>}
            {res.strIngredient9 !== '' && <li>{res.strIngredient9}</li>}
            {res.strIngredient10 !== '' && <li>{res.strIngredient10}</li>}
            {res.strIngredient11 !== '' && <li>{res.strIngredient11}</li>}
            {res.strIngredient12 !== '' && <li>{res.strIngredient12}</li>}
            {res.strIngredient13 !== '' && <li>{res.strIngredient13}</li>}
            {res.strIngredient14 !== '' && <li>{res.strIngredient14}</li>}
            {res.strIngredient15 !== '' && <li>{res.strIngredient15}</li>}
            {res.strIngredient16 !== '' && <li>{res.strIngredient16}</li>}
            {res.strIngredient17 !== '' && <li>{res.strIngredient17}</li>}
            {res.strIngredient18 !== '' && <li>{res.strIngredient12}</li>}
            {res.strIngredient19 !== '' && <li>{res.strIngredient12}</li>}
            {res.strIngredient20 !== '' && <li>{res.strIngredient12}</li>}

            </ul>
      
            <p>Can't read? Don't wanna read?</p>
            <iframe width="420" height="345" src={videoURL}>
            </iframe>
             <button className="recipe-page-button" type="submit" onClick={this.handleRecipeSave}>Save</button>
             {!this.props.isLoggedIn && <div className="save-error">{this.state.saveError}</div>}
             {this.state.saveSuccess && <div className="save-success">Successfully saved!</div>}
        </div>
            recipeArray.push( recipeHTML )
         }
        )
      }
        return recipeArray;
    }
     
render() {
    return (
     <div>
         {this.recipeMap()}
     </div>   
    )
}
}

export default RecipePage;