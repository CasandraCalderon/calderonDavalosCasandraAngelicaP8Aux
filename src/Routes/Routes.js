import React from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from '../pages/Login';
import Ventas from '../pages/Ventas/Interface';
export const Routes = () => {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/ventas" component={Ventas} />
                    
                </Switch>
            </BrowserRouter>
        </div>
    )
}
export default Routes;