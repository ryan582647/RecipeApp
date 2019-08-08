import React from 'react';
import RecipeSearch from '../searchbar/RecipeSearch'
import './App.css'

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
    //console.log("inside render for App")
    const { categories } = this.state;
    //console.log(categories)
    return (
    <div>
    <body>
    <nav role="navigation">Nav <span className="login">Sign in</span></nav>
        <section>
         <header role="banner">
            <h1>No More Meatloaf!</h1>
            <h3>The taste of a restaurant at your very own table!</h3>
            <h3>Start here:</h3>
            <RecipeSearch  categories={categories} />
         </header>
        </section>
    
        <section>
             <h3>Tired of crappy meals straight from 80's sitcoms?</h3>
             <p>No more Meatloaf is your surefire way to beat the tedium of eating at home.</p>
        </section>
        <section>
             <p>No More Meatloaf collects hundreds of of easy to make recipes that bring the taste of a restaurant at your very own table.</p>
             <p>Select your favorite kind of food, and our system will generate an list of delicious meals complete with instructions, images, and a video for you to follow along in the kitchen.</p>
        </section>
        <footer role="contact-info">My contacts here</footer>
    </body>
     </div>   
    );
}}

export default App;

