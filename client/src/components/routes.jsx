import React, {useContext} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import RecruiterDashboard from './dashboard/recruiterDashboard';
import CandidateDashboard from './dashboard/candidateDashboard';
import Home from './home/home';
import {AuthContext} from '../authContext';

function Routes() {
    const {auth} = useContext(AuthContext);
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact render={(props) => (<Home {...props}/>)}/>
                <Route path="/recruiterDashboard" exact>
                    {auth.token ? <RecruiterDashboard /> : <Redirect to="/"/>}
                </Route>
                <Route path="/candidateDashbaord" exact>
                    {auth.token ? <CandidateDashboard /> : <Redirect to="/"/>}
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;