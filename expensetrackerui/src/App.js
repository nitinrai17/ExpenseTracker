import React, { Component } from 'react';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import Category from './Category';
import Home from './Home';
import Expense from './Expense';

class App extends Component {
  state = {  }
  render() { 
    return (  
        <BrowserRouter>
          <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/category" component={Category}/>
              <Route path="/expense"  component={Expense}/>
          </Switch>
         </BrowserRouter> 

    );
  }
}
 
export default App;