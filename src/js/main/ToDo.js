import filter from 'lodash/filter';
import React, { Component } from 'react';
import ToDoList from './ToDoList';
import Filter from './Filter';
import ToDoItem from './ToDoItem';


export default class ToDo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            total: 0,
            items: {},
            filter: {
                showComplete: true,
                showIncomplete: true,
                showRemoved: true,
            },
        };
        this.addItem = ::this.addItem;
        this.changeVal = ::this.changeVal;
        this.handleKeyUp = ::this.handleKeyUp;
        this.handleComplete = ::this.handleComplete;
        this.handleRemove = ::this.handleRemove;
        this.filterAll = ::this.filterAll;
        this.filterComplete = ::this.filterComplete;
        this.filterIncomplete = ::this.filterIncomplete;
        this.filterRemoved = ::this.filterRemoved;
    }

    addItem(complete, removed) {
        if (this.state.value !== '') {
            this.state.total += 1;
            const item = {
                [this.state.total]: {
                    complete,
                    removed,
                    key: this.state.total,
                    value: this.state.value,
                },
            };
            this.setState({
                items: Object.assign({ ...this.state.items }, item),
                value: '',
            });
        }
    }

    handleKeyUp(e) {
        if (e.which === 13) {
            this.addItem(false, false);
        }
    }

    changeVal(e) {
        this.setState({ value: e.target.value });
    }


    handleComplete(key) {
        const item = { ...this.state.items[key] };
        item.complete = !item.complete;
        this.setState({ items: Object.assign({},
            this.state.items,
            { [key]: item }
        ) });
    }

    handleRemove(key) {
        const item = { ...this.state.items[key] };
        item.removed = !item.removed;
        this.setState({ items: Object.assign({},
            this.state.items,
            { [key]: item }
        ) });
    }

    filterAll() {
        this.setState({
            filter: {
                showComplete: true,
                showIncomplete: true,
                showRemoved: true,
            },
        });
    }

    filterComplete() {
        this.setState({
            filter: {
                showComplete: true,
                showIncomplete: false,
                showRemoved: false,
            },
        });
    }

    filterIncomplete() {
        this.setState({
            filter: {
                showComplete: false,
                showIncomplete: true,
                showRemoved: false,
            },
        });
    }

    filterRemoved() {
        this.setState({
            filter: {
                showComplete: false,
                showIncomplete: false,
                showRemoved: true,
            },
        });
    }

    render() {
        const inputStyle = {
            width: '80%',
            fontSize: '20px',
        };
        const addStyle = {
            display: 'inline-block',
            backgroundColor: 'rgba(30,150,30,0.9)',
            marginLeft: '50px',
            padding: '15px',
            color: 'rgba(255,255,255,0.8)',
            borderRadius: '5px',
            width: 'calc(20% - 50px)',
            textAlign: 'center',
            cursor: 'pointer',
        };

        const containerStyle = {
            margin: '2em auto 0px auto',
            width: '60%',
            backgroundColor: 'rgba(0,0,0,0.1)',
            padding: '50px',
            borderRadius: '10px',
            height: '80vh',
            position: 'relative',
        };

        const filteredItems = filter(this.state.items, (value) => {
            const { showRemoved, showComplete, showIncomplete } = this.state.filter;
            if (showComplete && showIncomplete && showRemoved) {
                return true;
            } else if (showRemoved) {
                return value.removed;
            } else if (showComplete) {
                return (value.complete && !value.removed);
            }
            return (!value.complete && !value.removed);
        });

        const itemsToRender = filteredItems.map((item) =>
            <ToDoItem
              key={ item.key }
              id={ item.key }
              value={ item.value }
              complete={ item.complete }
              removed={ item.removed }
              handleComplete={ this.handleComplete }
              handleRemove={ this.handleRemove }
            />
        );

        return (
            <div className="container-fluid" style={ containerStyle }>
                <input
                  onKeyUp={ this.handleKeyUp }
                  onChange={ this.changeVal }
                  value={ this.state.value }
                  placeholder="what would you like to do?"
                  style={ inputStyle }
                />
                <button
                  onClick={() => this.addItem(false, false)}
                  style={ addStyle }
                >Add
                </button>
                <ToDoList
                  items={ itemsToRender }
                />
                <Filter
                  filterAll={ this.filterAll }
                  filterComplete={ this.filterComplete }
                  filterIncomplete={ this.filterIncomplete }
                  filterRemoved={ this.filterRemoved }
                  filter={ this.state.filter }
                />
            </div>
        );
    }
}

