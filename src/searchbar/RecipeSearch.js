import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import RecipeResults from './RecipeResults'
class RecipeSearch extends React.Component {

constructor(props){
  super(props);
  this.state = {
    value: 'Beef',
    recipes: [],
    fetched: false
  }
  
  this.handleChange = this.handleChange.bind(this);
 

}
/*componentDidUpdate(listValue){
  const { onSubmit } = this.props
  if(listValue !== this.state.value){

  onSubmit(listValue)
  }
}*/
handleChange(e){
  const { onSubmit } = this.props


  this.setState(
    {value: e.target.value},
    onSubmit(e.target.value)
    )
    
  //const categoryValue = this.state.value;
  
  /*onSubmit(categoryValue)*/
}

componentDidMount(){
  const { onSubmit } = this.props
  const categoryValue = this.state.value;

  onSubmit(categoryValue)
}

categoryMap(){
  const categoryList = this.props.categories.meals;
  let categoryArray = []
  if (categoryList) {
    categoryList.map((cat) =>{
    categoryArray.push(<option value={cat.strCategory}>{cat.strCategory}</option>)
  })
}
  return categoryArray;
}

delayState() {
  setTimeout(() => {
      this.setState({
      fetched: false
    })
  }, 2000);
}

/* handleSubmit(e){
  //alert('Your favorite food is: ' + this.state.value)
  this.setState({recipes: []});
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${this.state.value}`)
        .then(response=> response.json())
        .catch(error => {throw new Error(error.message)})
        .then(data => {
            console.log(this.state.value)
            console.log(data)
            console.log("I have the data")
            
            this.setState({recipes: data, fetched: true}, this.delayState())
          });
e.preventDefault();

} */

render() {
  console.log(this.state.value);
     return (
    <div>
    <form onSubmit={this.handleSubmit}>
    <select name="dropdown" value={this.state.value} onChange={this.handleChange}>
      {this.categoryMap()}
    </select>
    <Link to='results'> <input type='submit' value='submit'></input> </Link>
    </form>
    </div>   
    );
}
}

export default RecipeSearch;