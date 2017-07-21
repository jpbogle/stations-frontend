import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import SearchItem from './SearchItem';
import { search } from './stationActions';
import * as Colors from '../common/Colors';

const SearchBox = styled.div`
    position: fixed;
    z-index: 11;

    div {
        padding: 0px;
    }

    input {
        border: 0;
        width: calc(100% - 24px);
        font-size: 24px;
        font-weight: 300;
        letter-spacing: 1px;
        padding: 12px;
        border-bottom: solid 1px;
        border-bottom-color: rgba(229,229,229,1);
        background: rgba(255, 255, 255, 0.9);
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        transition: .2s all;
    }
    input:focus {
        outline: none;
        border-bottom-color: ${Colors.highlightC};
    }
`;

class Search extends Component {

    static propTypes = {
        songs: PropTypes.array,
        search: PropTypes.func.isRequired,
    };

    static defaultProps = {
        songs: [],
    }

    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
        };
        this.handleChange = :: this.handleChange;
    }

    handleChange(e) {
        this.setState({
            ...this.state,
            searchValue: e.target.value,
        });
        this.props.search(e.target.value)
        // let key = 0;
        // const songs = this.props.songs.map((song) => {
        //     key += 1;
        //     return (
        //         <SearchItem
        //           key={key}
        //           song={song}
        //         />
        //     );
        // });
    }

    render() {
        return (
            <SearchBox className="container">
                <div className="content">
                    <input
                        type="text"
                        placeholder="suggest a song"
                        value={this.state.searchValue}
                        onChange={this.handleChange}
                    />
                </div>
                <div id="search-container" class="container">
                    <div className="content shadow">
                        <ul id="spotify-search-results" class="shown" >
                        </ul>
                        <ul id="soundcloud-search-results" >
                        </ul>
                    </div>
                </div>
            </SearchBox>

        );
    }
}

/**
 * Maps parts of the global redux store (the state) to props.
 */
function mapStateToProps(state) {
    return {

    };
}
/**
 * Maps actions and action creators to props. Never directly use
 * `dispatch` in a component as this hinders unit testing.
 */
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        search,
    }, dispatch);
}

// export connected component to be used inside a Provider
export default connect(mapStateToProps, mapDispatchToProps)(Search);
