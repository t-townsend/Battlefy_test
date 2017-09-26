import React from 'react';
import { getSummoner } from '../utilities/requests';

class Summoner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      summoners: []
    }
  }

  componentDidMount() {
    getSummoner()
      .then((summoners) => {
        console.log(summoners);

        summoners = [summoners];
        this.setState({
          summoners: summoners
        });
      });
  }

  _renderSummoners() {
    return this.state.summoners.map((summoner) => {
      return (
        <div className="Summoner" key={ summoner.id }>
          <p><strong>Account Id:</strong> { summoner.accountId }</p>
          <p><strong>Name:</strong> { summoner.name }</p>
          <p><strong>Summoner Level:</strong> { summoner.summonerLevel }</p>
          
        </div>
      );
    });
  }

  render() {
    return (
      <div className="Summoner">
        <h2 className="Summoner_header">Summoner Info</h2>
        { this._renderSummoners() }
      </div>
    );
  }

};

export default Summoner;