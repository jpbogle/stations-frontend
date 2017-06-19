import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class ToDoList extends Component {
    static propTypes = {
        items: PropTypes.array,
    }

    static defaultProps = {
        items: {},
    }

    render() {
        const styles = {
            listStyle: {
                overflow: 'scroll',
                height: '85%',
                padding: '0px',
            },
        };
        return (
            <ul style={ styles.listStyle }>
                { this.props.items }
            </ul>
        );
    }
}
