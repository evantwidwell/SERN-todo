import React from 'react'
import { Switch, Route} from 'react-router'

import Login from './Login'
import Movies from './Movies'





const Router = () => {
    return (
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route path="/movie" component={Movies}/>
            
        </Switch>
    );
};

export default Router;