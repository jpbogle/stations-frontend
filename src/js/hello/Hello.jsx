import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Alert } from 'react-bootstrap';

import * as helloActions from './helloActions';
import Message from '../common/Message';
import Button from '../common/Button';

/**
* Simple presentational Hello component. Uses the state of the
* application therefore it is `connected` using react-redux. When
* the component is imported, it must be rendered as a child of a
* Provider component.
*
*      import Hello from '/path/to/Hello'
*
* For testing purposes, the Hello class itself is exported. This
* allows for the importing of the not yet connected component by
* using decomposition.
*
*      import { Hello } from '/path/to/Hello'
*/
export class Hello extends Component {
  /**
   * Validation of props. Required for all props in use.
   */
  static propTypes = {
    onButtonClicked: PropTypes.func.isRequired,
    onRequestQuotes: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    error: PropTypes.shape({
      status: PropTypes.number.isRequired,
      statusText: PropTypes.string.isRequired,
    }).isRequired,
    fetching: PropTypes.bool.isRequired,
  }

  /*
      props: set by react-redux.connect
  */
  componentWillMount() {
    const { onRequestQuotes } = this.props;

    // default
    onRequestQuotes('assets/quotes.json');
  }

  render() {
    const { text, onButtonClicked, error, fetching } = this.props;

    const barStyle = {
      padding: '30px',
      fontSize: '3em',
    };

    let content;

    if (fetching) {
      content = <div style={barStyle} />;
    } else if (error) {
      content = (
        <Alert bsStyle="danger">
          { error.status } { error.statusText }
        </Alert>
      );
    } else {
      content = (<div>
        <Message text={text} />
        <Button onButtonClicked={onButtonClicked} />
      </div>);
    }

    return (
      <div className="hello-root">
        {content}
      </div>
    );
  }
}

/**
* Maps parts of the global redux store (the state) to props.
*/
function mapStateToProps(state) {
  return {
    fetching: state.hello.fetching,
    text: state.hello.text,
    error: state.hello.error,
  };
}
/**
* Maps actions and action creators to props. Never directly use
* `dispatch` in a component as this hinders unit testing.
*/
function mapDispatchToProps(dispatch) {
  return bindActionCreators(helloActions, dispatch);
}

// export connected component to be used inside a Provider
export default connect(mapStateToProps, mapDispatchToProps)(Hello);
