import React, { Component } from 'react';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import Category from './Category';
import Home from './Home';
import Expenses from './Expenses';

class App extends Component {
  state = {  }
  render() { 
    return (  
        <BrowserRouter>
          <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/categories" component={Category}/>
              <Route path="/expenses"  component={Expenses}/>
          </Switch>
         </BrowserRouter> 

    );
  }
}
 
export default App;