import { browserHistory } from 'react-router';
import React, { Component } from 'react';
import styled from 'styled-components';
import SpotifyLogoGreen from '../common/SpotifyLogoGreen';
import AppleMusicLogo from '../common/AppleMusicLogo';
import SoundcloudLogo from '../common/SoundcloudLogo';

import { loginSpotify, authSpotify, authAppleMusic, authSoundcloud } from './dashboardActions';


const Accounts = styled.div`
    .logo {
        margin: 10px 0px;
        svg {
            height: 40px;
        }
    }
`;

const AccountSmall = styled.div`
    height: 80px;
    border-top: 1px solid #ddd;
    cursor: pointer;
    transition: .2s;
    padding: 5px 12px;
    img {
        width: 80px;
        height: 80px;
        border-radius: 40px;
        float: left;
    }
    .info {
        float: left;
        padding-left: 15px;
    }
    .name {
        font-size: 24px;
        white-space: nowrap;
        max-width: 850px;
        overflow: hidden;
    }

`;

const Header = styled.div`
    font-size: 20px;
    padding-bottom: 10px;
`;

const SpotifyAccount = styled.div`
    height: 150px;

    img {
        padding: 25px;
        width: 100px;
        display: inline-block;
        float: left;
    }
    #info {
        padding-top: 25px;
        display: inline-block;
        float: left;
    }
`;

export default class AccountsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spotify: null,
        };
        this.loginSpotify = :: this.loginSpotify;
    }

    componentDidMount() {
        const item = this.props.accounts.find(account => account.source === 'spotify');
        if (item) {
            this.loginSpotify(item.access_token);
        } else {
            this.setState({
                spotify: null,
            })
        }
    }

    componentWillReceiveProps(props) {
        const item = props.accounts.find(account => account.source === 'spotify');
        if (item) {
            this.loginSpotify(item.access_token);
        } else {
            this.setState({
                spotify: null,
            })
        }
    }

    loginSpotify(access_token) {
        loginSpotify(access_token).then((account) => {
            if (account === 401) {
                this.props.refreshSpotify();
            } else {
                this.setState({
                    ...this.state,
                    spotify: account,
                }, () => {
                    console.log(this.state);
                });
            }
        });
    }

    removeAccount(source) {
        this.props.removeAccount(source);
    }

    render() {
        const userAccounts = this.props.accounts;
        const spotifyAccount = this.state.spotify ?
            (<AccountSmall>
                <img alt={this.state.spotify.display_name} src={this.state.spotify.images[0].url} />
                <div className="info">
                    <div className="name">{this.state.spotify.display_name}</div>
                    <div className="logout" onClick={() => this.removeAccount("spotify")}>logout</div>
                </div>
            </AccountSmall>) :
            (<AccountSmall>
                <div onClick={() => authSpotify()}>Login</div>
            </AccountSmall>);

        const appleMusicAccount = this.state.appleMusic ?
            (<AccountSmall>
                logged in appleMusic
            </AccountSmall>) :
            (<AccountSmall>
                <div onClick={() => authAppleMusic()}>Login</div>
            </AccountSmall>);

        const soundcloudAccount = this.state.soundcloud ?
            (<AccountSmall>
                logged in soundcloud
            </AccountSmall>) :
            (<AccountSmall>
                <div onClick={() => authSoundcloud()}>Login</div>
            </AccountSmall>);

        return (
            <Accounts style={{ height: 'calc(100vh - 259px)', backgroundColor: '#eee', overflow: 'scroll' }}>
                <div className="content">
                    <div className="logo">
                        <SpotifyLogoGreen />
                    </div>
                    {spotifyAccount}
                    <div className="logo">
                        <AppleMusicLogo />
                    </div>
                    {appleMusicAccount}
                    <div className="logo">
                        <SoundcloudLogo />
                    </div>
                    {soundcloudAccount}
                </div>
            </Accounts>
        );
    }
}
