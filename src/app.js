/* eslint-disable import/no-unresolved */

import React from 'react';
import ReactDOM from 'react-dom';

import ReportCallout from './report';
import Score from './score';
import Lanes from './lanes';
import * as maps from './maps';

import 'react-foundation-components/lib/_typography.scss';

const App = () => {
  let scoreComponent = null;
  const mapFile = location.hash.replace('#', '');

  function publishLaneChoice(score) {
    console.log("App#publishLaneChoice score", score);
    scoreComponent.setScore(score);
  }

  return (
    <div id="appContainer">
      <img id="map" role="presentation" src={maps[mapFile]} />
      <Score ref={(comp) => scoreComponent = comp} />
      <Lanes publishLaneChoice={(score) => publishLaneChoice(score)} />
      <ReportCallout />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
