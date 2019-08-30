import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import './RecipeSearch.css'
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

handleChange(e){
  const { onSubmit } = this.props


  this.setState(
    {value: e.target.value},
    onSubmit(e.target.value)
    )
    

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


render() {
  const {location: {pathname}} = this.props;
  
  if(pathname === '/login' || pathname === '/create-account' || pathname === '/logout' ) {
      
    return null;
  } else {  
     return (
    <div>
      <form onSubmit={this.handleSubmit}>
      <select className="meal-dropdown" name="dropdown" value={this.state.value} onChange={this.handleChange}>
      {this.categoryMap()}
    </select>
    <Link to='results'> <input className="button" type='submit' value='submit'></input> </Link>
    </form>
    </div>   
    );
  }
}
}

export default withRouter(RecipeSearch);