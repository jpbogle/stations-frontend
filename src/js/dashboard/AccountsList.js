import { browserHistory } from 'react-router';
import React, { Component } from 'react';
import styled from 'styled-components';
import StationSmall from './StationSmall';
import CreateStation from './CreateStation';


export default class AccountsList extends Component {


    mapStations(stations) {
        let key = 0;
        return stations.map((station) => {
            key += 1;
            return (
                <div
                  role="presentation"
                  onClick={() => this.goToStation(`/${this.props.username}/${station.name}`)}
                  key={key}
                >
                    <StationSmall
                      name={station.name}
                      username={this.props.username}
                      albumCover={station.songs.length > 0 ? station.songs[0].album_url : ''}
                      numSongs={station.songs ? station.songs.length : 0}
                      numAdmins={stations.admins ? station.admins.length : 0}
                    />
                </div>
            );
        });
    }

    render() {
        const stations = this.props.stations == null ? '' : this.mapStations(this.props.stations);

        const styles = {

        };
        return (
            <div style={{ height: 'calc(100vh - 259px)', backgroundColor: '#eee', overflow: 'scroll' }}>
                <div className="content">
                    <h1>stations</h1>
                    {stations}
                    <div role="presentation" onClick={this.props.showCreate}>
                        <CreateStation />
                    </div>
                </div>
            </div>
        );
    }
}
