
import Home from './Home';
import Explore from './Explore';
import Places from './Places';
import Blog from './Blog';
import Create from './Create';
import BlogDetails from './BlogDetails';
import Errors from './Errors';
import Signup from './Signup'
import { BrowserRouter as Router, Route, Switch}  from 'react-router-dom';
//import React from 'react"


function App() {
  
  return (
    <Router>
   
    <div className="content">
     <Switch>
       <Route exact path="/">
          <Home />
        </Route>
      <Route path="/blog">
          <Blog />
        </Route>
       <Route  path="/create">
          <Create />
        </Route>
         <Route  path="/signup">
          <Signup />
        </Route>
         <Route  path="/blogs/:id">
          <BlogDetails />
        </Route>
         <Route  path="/explore">
          < Explore/>
        </Route>
        <Route  path="/places">
          <Places />
        </Route>
        <Route  path="*">
          <Errors />
        </Route>
     </Switch>
      </div> 
    </Router>
  );
}

export default App;
