import PropTypes from 'prop-types';
import React, { Component } from 'react';


export default class Item extends Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        value: PropTypes.string.isRequired,
        complete: PropTypes.bool.isRequired,
        removed: PropTypes.bool.isRequired,
        handleComplete: PropTypes.func.isRequired,
        handleRemove: PropTypes.func.isRequired,
    };

    render() {
        const styles = {
            itemStyle: {
                paddingBottom: '8px',
                margin: '40px',
                width: 'calc(100% - 50px)',
                listStyleType: 'none',
                borderBottom: '1px solid rgba(0,0,0,0.3)',
            },
            description: {
                display: 'inline-block',
                paddingLeft: '30px',
                fontSize: '20px',
            },
            complete: {
                color: 'rgba(20,150,20,0.8)',
            },
            incomplete: {
                color: 'rgba(150,20,20,0.8)',
            },
            deleted: {
                textDecoration: 'line-through',
            },
            checkbox: {
            },
            removeBtn: {
                float: 'right',
                cursor: 'pointer',
            },
        };

        const typeStyle = this.props.complete ? styles.complete : styles.incomplete;

        if (this.props.removed) {
            Object.assign(typeStyle, styles.deleted);
        }

        return (
            <li className="item" style={ styles.itemStyle }>
                <input
                  onChange={() => this.props.handleComplete(this.props.id) }
                  style={ styles.checkbox }
                  type="checkbox"
                  checked={ this.props.complete }
                />
                <div className="description" style={{ ...typeStyle, ...styles.description }}>
                    { this.props.value }
                </div>
                <i
                  onClick={() => this.props.handleRemove(this.props.id) }
                  className="fa fa-times fa-2x"
                  aria-hidden="true"
                  style={ styles.removeBtn }
                />
            </li>
        );
    }
}
