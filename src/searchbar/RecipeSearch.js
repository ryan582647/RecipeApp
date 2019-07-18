import React from 'react'

class RecipeSearch extends React.Component {

constructor(props){
  super(props);
  this.state = {
    value: 'Beef',
    recipes: []
  }
  
  this.handleSubmit = this.handleSubmit.bind(this);
  this.handleChange = this.handleChange.bind(this);

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

handleChange(e){
  this.setState({value: e.target.value});
}

handleSubmit(e){
  //alert('Your favorite food is: ' + this.state.value)

  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${this.state.value}`)
        .then(response=> response.json())
        .catch(error => {throw new Error(error.message)})
        .then(data => {
            console.log(this.state.value)
            console.log(data)
            console.log("I have the data")
            this.setState({recipes: data})
          });
console.log(this.state.recipes);
e.preventDefault();
}

render() {
  console.log("inside render for recipesearch")
  //console.log(this.props.categories)
     return (
    <div>
    <form onSubmit={this.handleSubmit}>
    <select name="dropdown" value={this.state.value} onChange={this.handleChange}>
      {this.categoryMap()}
    </select>
    <input type='submit' value='submit'></input>
    </form>
    </div>   
    );
}
}

export default RecipeSearch;