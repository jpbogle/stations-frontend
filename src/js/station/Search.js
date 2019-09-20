import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import SearchItem from './SearchItem';
import { searchAll } from './stationActions';
import { refreshSpotify } from '../dashboard/dashboardActions';

import * as Colors from '../common/Colors';
import LoadingSpin from '../common/LoadingSpin';

const LoadingContainer = styled.div`
    text-align: center;
    svg {
        width: 100px;
    }
`;

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
    ul {
        display: inline-block;
        width: ${props => props.resultsWidth};
        float: left;
        div {
            height: 25px;
            opacity: 1;
            color: white;
            text-align: center;
        }
    }
    #appleMusic-search-results-bar {
        background-color: #888;
    }
    #soundcloud-search-results-bar {
        background-color: ${Colors.soundcloudC}
    }
    #spotify-search-results-bar {
        background-color: ${Colors.spotifyC}
    }
    #soundcloud-logo {
      margin-top: 6px;
      height: 14px;
      width: 91px;
    }
`;

class Search extends Component {

    static propTypes = {
        searchAll: PropTypes.func.isRequired,
        refreshSpotify: PropTypes.func.isRequired,
        searchValue: PropTypes.string.isRequired,
        loadingSoundcloud: PropTypes.bool.isRequired,
        loadingAppleMusic: PropTypes.bool.isRequired,
        loadingSpotify: PropTypes.bool.isRequired,
        results: PropTypes.object,
    };

    static defaultProps = {
        results: {},
    }

    constructor(props) {
        super(props);
        // this.handleMouseMove = throttle(::this.handleMouseMove, 50, { trailing: true, leading: true });
        let soundcloud = true;
        let spotify = this.props.spotifyToken ? true : false;
        let appleMusic = false;
        this.state = {
            soundcloud,
            spotify,
            appleMusic,
        }
        this.handleChange = :: this.handleChange;
    }

    componentWillReceiveProps(props) {
        //Search again if not matching the current search value
        // if (props.results.soundcloud.query !== this.state.searchValue) {
        //     this.props.searchSoundcloud(this.state.searchValue);
        // }
        //
        if (props.results.spotify.error.status === 401) {
            props.refreshSpotify(props.username);
            this.handleChange();
        }
    }

    handleChange(query) {
        this.props.searchAll(query, this.state.soundcloud, this.state.spotify, this.state.appleMusic, this.props.spotifyToken);
    }

    render() {
        let soundCloudKey = 0;
        const soundCloudSongs = this.props.loadingSoundcloud ?
            (<LoadingContainer>
                <LoadingSpin />
            </LoadingContainer>) :
            this.props.results.soundcloud.songs.map((song) => {
                soundCloudKey += 1;
                return (
                    <SearchItem
                      key={soundCloudKey}
                      song={song}
                      source="soundcloud"
                      postAdd={() => this.handleChange('')}
                    />
                );
            });

        let appleMusicKey = 0;
        const appleMusicSongs = this.props.loadingAppleMusic ?
            (<LoadingContainer>
                <LoadingSpin />
            </LoadingContainer>) :
            this.props.results.appleMusic.songs.map((song) => {
            appleMusicKey += 1;
            return (
                <SearchItem
                  key={appleMusicKey}
                  song={song}
                  source="appleMusic"
                  postAdd={() => this.handleChange('')}
                />
            );
        });

        let spotifyKey = 0;
        const spotifySongs = this.props.loadingSpotify ?
            (<LoadingContainer>
                <LoadingSpin />
            </LoadingContainer>) :
            this.props.results.spotify.songs.map((song) => {
            spotifyKey += 1;
            return (
                <SearchItem
                  key={spotifyKey}
                  song={song}
                  source="spotify"
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
                minHeight: '150px',
                maxHeight: 'calc(100vh - 304px)',
                borderBottom: 'none',
                overflowX: 'visible',
                background: '#eee',
                position: 'relative',
                top: '0',
                borderBottomLeftRadius: '4px',
                borderBottomRightRadius: '4px',
                opacity: `${this.props.searchValue.length > 0 ? 1: 0}`,
            },
            shadow: {
                WebkitBoxShadow: '12px 12px 64px -12px rgba(0,0,0,0.75)',
                MozBoxShadow: '12px 12px 64px -12px rgba(0,0,0,0.75)',
                boxShadow: '12px 12px 64px -12px rgba(0,0,0,0.75)',
            },
        };
        let numResults = 0;
        numResults += this.state.spotify;
        numResults += this.state.soundcloud;
        numResults += this.state.appleMusic; 
        return (
            <SearchBox className="container" resultsWidth={`${1/numResults * 100}%`}>
                <div className="content">
                    <input
                      type="text"
                      placeholder="suggest a song"
                      value={this.props.searchValue}
                      onChange={e => this.handleChange(e.target.value)}
                    />
                </div>
                <div className="container" style={styles.searchContainer}>
                    <div className="content" style={{ ...styles.searchContent, ...styles.shadow }}>
                        { this.state.appleMusic &&
                            <ul id="appleMusic-search-results">
                                <div id="appleMusic-search-results-bar">apple music</div>
                                {appleMusicSongs}
                            </ul>
                        }
                        { this.state.soundcloud &&
                            <ul id="soundcloud-search-results">
                                <div id="soundcloud-search-results-bar">soundcloud</div>
                                {soundCloudSongs}
                            </ul>
                        }
                        { this.state.spotify &&
                            <ul id="spotify-search-results">
                                <div id="spotify-search-results-bar">spotify</div>
                                {spotifySongs}
                            </ul>
                        }
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
    let item = null;
    if (state.login.user) {
        item = state.login.user.accounts.find(account => account.source === 'spotify');
    }
    return {
        results: state.station.search,
        searchValue: state.station.search.value,
        loadingSoundcloud: state.station.search.soundcloud.loading,
        loadingAppleMusic: state.station.search.appleMusic.loading,
        loadingSpotify: state.station.search.spotify.loading,
        spotifyToken: item ? item.access_token : null,
        username: state.login.user ? state.login.user.username : null,
    };

}
/**
 * Maps actions and action creators to props. Never directly use
 * `dispatch` in a component as this hinders unit testing.
 */
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        searchAll,
        refreshSpotify,
    }, dispatch);
}

// export connected component to be used inside a Provider
export default connect(mapStateToProps, mapDispatchToProps)(Search);
