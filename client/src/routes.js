import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Links, Auth, Detail, Create} from './pages';

export const useRoutes = isAuth => {
    if (isAuth) {
        return (
            <Switch>
                <Route path="/links" exact>
                    <Links />
                </Route>
                <Route path="/create" exact>
                    <Create />
                </Route>
                <Route path="/detail/:id">
                    <Detail />
                </Route>
                <Redirect to="/create"/>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <Auth />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}