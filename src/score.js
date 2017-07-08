import React, {Component, PropTypes} from 'react';
import 'rc-progress/assets/index.css';
import { Line as LineProgress } from 'rc-progress';

import * as imgs from './imgs';

const scoreLookup = {
  location: {reference: 60, optimum: 200},
  catering: {reference: 150, optimum: 200},
};
const sumReferences = Object.keys(scoreLookup)
                            .map(key => scoreLookup[key].reference)
                            .reduce((acc, val) => acc + val, 0);
const sumOptima = Object.keys(scoreLookup)
                        .map(key => scoreLookup[key].optimum)
                        .reduce((acc, val) => acc + val, 0);

class Score extends Component {

  state = {
    curReference: scoreLookup.location.reference,
    sumReferences: sumReferences,
    curOptimum: scoreLookup.location.optimum,
    sumOptima: sumOptima,
    score: 0,
    meterWidth: 0,
    meterHorizontalMargin: 56,
  };

  render() {
    console.log("Score#render state.score (percent)", this.state.score);
    let referencePercent = scoreToPercent(this.state.curReference, this.state.sumOptima);
    let optimumPercent = scoreToPercent(this.state.curOptimum, this.state.sumOptima);
    console.log("referencePercent", referencePercent);
    console.log("optimumPercent", optimumPercent);

    // account for the fact that pins have a certain width and offset the bar position to it
    const pinStyle = {
      width: '60px',
    };
    const pinCenter = (parseInt(pinStyle.width) / 2) - 10;
    const offsetToCenterOfPins = pinCenter / this.state.meterWidth * 100;
    console.log("offsetToCenterOfPins", offsetToCenterOfPins);
    referencePercent -= offsetToCenterOfPins;
    optimumPercent -= offsetToCenterOfPins;

    // merge the actual pin positions to dedicated style objects
    const referencePinStyle = Object.assign({}, pinStyle, {left: referencePercent + "%"});
    const optimumPinStyle = Object.assign({}, pinStyle, {left: optimumPercent + "%"});

    const meterStyle = {margin: '20px ' + this.state.meterHorizontalMargin + 'px'};
    return (
      <div id="meter" style={meterStyle}>
        <div id="reference_needle" className="needle" style={referencePinStyle}>
          <span>R</span>
          <img src={imgs['pinBlue']} />
        </div>
        <div id="optimum_needle" className="needle" style={optimumPinStyle}>
          <span>O</span>
          <img src={imgs['pinGreen']} />
        </div>
        <LineProgress percent={this.state.score}
                      strokeWidth="1" strokeColor="#00FF00"
                      trailWidth="1" />
      </div>
    );
  }

  setScore(score) {
    console.log("Score#setScore score", score, "old score (percent)", this.state.score);
    this.setState({score: scoreToPercent(score, this.state.sumOptima)})
  }

  updateMeterWidth() {
    this.setState({meterWidth: window.innerWidth - this.state.meterHorizontalMargin * 2});
    console.log("updateMeterWidth", window.innerWidth - this.state.meterHorizontalMargin * 2, window.innerWidth, this.state.meterHorizontalMargin);
  }

  componentWillMount() {
    this.updateMeterWidth();
    window.addEventListener('resize', this.updateMeterWidth.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateMeterWidth);
  }

}

function scoreToPercent(score, optimum) {
  return score / optimum * 100;
}

export default Score;