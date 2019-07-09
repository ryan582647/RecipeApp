import React from 'react'

class RecipeSearch extends React.Component {

categoryMap(){
  const categoryList = this.props.categories.meals;
  let categoryArray = []
  if (categoryList) {
    categoryList.map((category, i) =>{
    categoryArray.push(<option value={category.strCategory}>{category.strCategory}</option>)
  }
  )}
  return categoryArray;
}


render() {
  console.log("inside render for recipesearch")
  console.log(this.props.categories)
     return (
    <div>
    <select name="dropdown">
      {this.categoryMap()}
    </select>
    </div>   
    );
}
}

export default RecipeSearch;