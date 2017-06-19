import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import IconTile from './IconTile';

export default class MainMenu extends Component {

    render() {
        return (
            <div className="container-fluid" style={{ marginTop: '1em' }}>
                <DocumentTitle title="ToDo" />
                <div className="row" style={{ width: '75%' }}>
                    <IconTile icon="hand-paper-o" href="#/hello" label="Hello world" />
                </div>
            </div>
        );
    }
}
