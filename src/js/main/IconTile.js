import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class IconTile extends Component {

    static propTypes = {
        href: PropTypes.string,
        icon: PropTypes.string,
        label: PropTypes.string,
    };

    render() {
        return (
            <div className="col-xs-6">
                <a href={this.props.href || '#'} className="icon-tile thumbnail">
                    <h1>
                        <i className={`fa fa-${this.props.icon || 'hand-spock-o'}`} />
                        { this.props.label }
                    </h1>
                </a>
            </div>
        );
    }
}
