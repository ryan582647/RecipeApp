import React from 'react';
import { Link } from 'react-router-dom'

class HomePage extends React.Component {

 
     
render() {
    return (
    <div>
        <div>
             <h3>You have successfully signed out.</h3>
        </div>  
        <div>  
             <Link to="/">Home</Link>
        </div>   
    </div>
    )
}
}

export default HomePage;