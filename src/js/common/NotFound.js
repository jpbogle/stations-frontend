import React, { Component } from 'react';

export default class NotFound extends Component {

    render() {
        return (
            <div className="jumbotron">
                <h1>Not found</h1>
                <h2>No route for <code>{document.location.hash}</code></h2>
            </div>
        );
    }
}
