import React from 'react';
import RecipeSearch from '../searchbar/RecipeSearch'

class App extends React.Component {
    state = {
        recipes: [],
        recipesearch: '',
        categories: []
    }
 apiCall(){
    fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
    .then(response=> response.json())
    .catch(error => {throw new Error(error.message)})
    .then(data => {this.setState({categories: data})});
 }
 componentWillMount() 
 {
        this.apiCall();
 }
    



render() {
    console.log(this.state.categories)
    return (
    <div>
    <h1 className="recipe-title">Delicious Home Cooked Meals for You!</h1>
    <RecipeSearch categories={this.state.categories}/>
     </div>   
    );
}
}

export default App;

