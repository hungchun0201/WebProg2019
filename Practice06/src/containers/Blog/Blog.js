import React, { Component } from "react";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";

import Authors from "./Authors/Authors";
import Posts from "./Posts/Posts";
import PostRender from "./Posts/PostRender";
// import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


export default class Blog extends Component {
    render() {
        return (
            <div>
                <Button variant="contained" color="primary">
                    <NavLink to="/home">Home</NavLink>
                </Button>
                <Button variant="outlined" color="warning" >
                    <NavLink to="/posts">Posts</NavLink>
                </Button>
                <Button variant="contained" color="secondary">
                    <NavLink to="/authors">Authors</NavLink>
                </Button>
                <hr />
                <Switch>
                    <Route exact path="/posts" component={Posts} />
                    <Route exact path="/authors" component={Authors} />
                    <Route path="/posts/:id?" component={PostRender} />
                    <Redirect from="/home" to="/" />
                </Switch>
            </div>
        );
    }
}
