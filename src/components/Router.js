import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PlaylistPage from './PlaylistPage';
import App from './App';
import NotFound from "./NotFound"

class Router extends Component {
    constructor() {
        super();
        this.state = {
            playlists: {}
        }
    }

    setPlaylists = (playlists) => {
        this.setState = { playlists }
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route
                        exact
                        path="/"
                        component={App}
                        setPlaylists={this.setPlaylists}
                    >
                    </Route>
                    {/* <Route exact path="/playlists" component={App}> </Route> */}
                    <Route exact path="/:playlistId" component={PlaylistPage}> </Route>
                    {/* <Route exact path="/playplist/:playplistId" component={App}> </Route> */}
                    <Route componenent={NotFound} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Router;


