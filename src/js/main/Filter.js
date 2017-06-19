import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class Filter extends Component {
    static propTypes = {
        filter: PropTypes.object.isRequired,
        filterAll: PropTypes.func.isRequired,
        filterComplete: PropTypes.func.isRequired,
        filterIncomplete: PropTypes.func.isRequired,
        filterRemoved: PropTypes.func.isRequired,
    };

    render() {
        const styles = {
            buttonStyle: {
                width: 'calc(25% - 6px)',
                marginLeft: '3px',
                marginRight: '3px',
                textAlign: 'center',
                display: 'inline-block',
                padding: '10px',
                borderRadius: '5px',
                cursor: 'pointer',
                backgroundColor: 'rgba(0,0,0, 0.4)',
                color: 'rgba(255,255,255,0.8)',
            },
            filterStyle: {
                position: 'absolute',
                bottom: '20px',
                width: 'calc(100% - 100px)',
                margin: '0px auto 0px auto',
            },
            clickedButton: {
                backgroundColor: 'rgba(255,255,255,0.5)',
                color: 'rgba(0,0,0,0.9)',
            },
        };
        const { showRemoved, showComplete, showIncomplete } = this.props.filter;
        const { filterAll, filterComplete, filterIncomplete, filterRemoved } = this.props;
        const { buttonStyle, clickedButton, filterStyle } = styles;

        let completeStyle   = showComplete   ? { ...buttonStyle, ...clickedButton } : buttonStyle;
        let incompleteStyle = showIncomplete ? { ...buttonStyle, ...clickedButton } : buttonStyle;
        let removeStyle     = showRemoved    ? { ...buttonStyle, ...clickedButton } : buttonStyle;

        let allStyle;
        if (showComplete && showIncomplete && showRemoved) {
            allStyle = { ...buttonStyle, ...clickedButton };
            completeStyle = buttonStyle;
            incompleteStyle = buttonStyle;
            removeStyle = buttonStyle;
        } else {
            allStyle = buttonStyle;
        }


        return (
            <div style={ filterStyle }>
                <button onClick={ filterAll } style={ allStyle }>All</button>
                <button onClick={ filterComplete } style={ completeStyle }>Completed</button>
                <button onClick={ filterIncomplete } style={ incompleteStyle }>Incomplete</button>
                <button onClick={ filterRemoved } style={ removeStyle }>Trash</button>
            </div>
        );
    }
}
