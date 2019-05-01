import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './Components/Container/Home/Home'
import Cart from './Components/Container/Cart/Cart'
import About from './Components/Container/About/About'


export default (
<Switch>
    <Route exact path='/' component={Home} />
    <Route path='/cart' component={Cart} />
    <Route path='/about' component={About} />
</Switch>
);
