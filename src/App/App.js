import React from 'react';
import RecipeSearch from '../searchbar/RecipeSearch'

class App extends React.Component {
   
    
 constructor(props){
     super(props)
     this.state = {
         categories: []
     }
 }

 componentDidMount(){
        fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
        .then(response=> response.json())
        .catch(error => {throw new Error(error.message)})
        .then(data => {
            console.log("I have the data")
            this.setState({categories: data})});
    }

render() {
    console.log("inside render for App")
    const { categories } = this.state;
    console.log(categories)
    return (
    <div>
    <h1 className="recipe-title">Delicious Home Cooked Meals for You!</h1>
     <RecipeSearch categories={categories}/>
     </div>   
    );
}
}

export default App;

