import React, { Component } from "react";
import { NavLink } from "react-router-dom";
export default class Posts extends Component {
    render() {
        const postIDs = ["1", "2", "3", "4", "5"];
        const author_name = ["Hemimgway"];
        const lists = author_name.map((i, index) => (
            <li key={index}>
                <NavLink to={"/authors/" + index}>{i}</NavLink>
            </li>
        ));

        return (
            <div>
                <h3>Welcome to see the authors</h3>
                <h3>who do you want to see?</h3>
                {lists}
            </div>
        );
    }
}