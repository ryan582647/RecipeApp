import React from 'react'

class RecipeSearch extends React.Component {

/*categoryMap(){
  const categoryList = this.props.categories.meals;
  console.log(categoryList);
  if (categoryList) {
    categoryList.map((category, i) =>{        
    return <option value={categoryList[i].strCategory}>{categoryList[i].strCategory}</option>
  })
}}*/

render() {
  console.log(this.props.categories)
     return (
    <div>
    <select name="dropdown">
    </select>
    </div>   
    );
}
}

export default RecipeSearch;