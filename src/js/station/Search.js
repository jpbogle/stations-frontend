import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import SearchItem from './SearchItem';
import { searchAll, searchSoundcloud } from './stationActions';
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
        searchAll: PropTypes.func.isRequired,
        searchSoundcloud: PropTypes.func.isRequired,
        results: PropTypes.object,
    };

    static defaultProps = {
        results: {},
    }

    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
        };
        this.handleChange = :: this.handleChange;
    }

    componentWillReceiveProps(props) {
        //Search again if not matching the current search value
        if (props.results.soundcloud.query !== this.state.searchValue) {
            this.props.searchSoundcloud(this.state.searchValue);
        }
    }

    handleChange(query) {
        this.setState({
            ...this.state,
            searchValue: query,
        });
        this.props.searchAll(query);
    }

    render() {
        let key = 0;
        const soundCloudSongs = this.props.results.soundcloud.songs.map((song) => {
            key += 1;
            return (
                <SearchItem
                  key={key}
                  song={song}
                  source="soundcloud"
                  postAdd={() => this.handleChange('')}
                />
            );
        });

        const styles = {
            searchContainer: {
                zIndex: 11,
            },
            searchContent: {
                overflowY: 'scroll',
                padding: '0',
                maxHeight: 'calc(100vh - 304px)',
                borderBottom: 'none',
                overflowX: 'visible',
                background: '#eee',
                position: 'relative',
                top: '0',
                borderBottomLeftRadius: '4px',
                borderBottomRightRadius: '4px',
            },
            shadow: {
                WebkitBoxShadow: '12px 12px 64px -12px rgba(0,0,0,0.75)',
                MozBoxShadow: '12px 12px 64px -12px rgba(0,0,0,0.75)',
                boxShadow: '12px 12px 64px -12px rgba(0,0,0,0.75)',
            },
        };
        return (
            <SearchBox className="container">
                <div className="content">
                    <input
                      type="text"
                      placeholder="suggest a song"
                      value={this.state.searchValue}
                      onChange={e => this.handleChange(e.target.value)}
                    />
                </div>
                <div className="container" style={styles.searchContainer}>
                    <div className="content" style={{ ...styles.searchContent, ...styles.shadow }}>
                        <ul id="spotify-search-results" class="shown" >
                        </ul>
                        <ul id="soundcloud-search-results" >
                            {soundCloudSongs}
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
        results: state.station.search,
    };
}
/**
 * Maps actions and action creators to props. Never directly use
 * `dispatch` in a component as this hinders unit testing.
 */
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        searchAll,
        searchSoundcloud,
    }, dispatch);
}

// export connected component to be used inside a Provider
export default connect(mapStateToProps, mapDispatchToProps)(Search);
