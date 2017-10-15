import React, {Component} from 'react';
import MediaQuery from 'react-responsive';
import RecordCarousel from './RecordCarousel';
import Record from './Record';

class Records extends Component {

  constructor(props) {
    super(props);
    const kind = props.title === 'Location' ? 'location' : 'catering';
    const cardProps = {
      selected: false,
      metadata: {
        capacity: 2400,
        conferenceRooms: 8,
        distanceCenter: 0.8,
        distanceStation: 0.1
      }
    };
    this.state = {
      cardDetail: null,
      records: [
        {title: "Kap Hanau am Fluß", id: kind + '1', kind: kind, card: cardProps},
        {title: "Bla blub", id: kind + '2', kind: kind, card: cardProps},
        {title: "asdqwe wersfs", id: kind + '3', kind: kind, card: cardProps},
        {title: "Fluß Buss Nuss", id: kind + '4', kind: kind, card: cardProps},
      ]
    };
    this.handleDetailClick = this.handleDetailClick.bind(this);
    this.handleCardSelected = this.handleCardSelected.bind(this);
  }

  render() {
    // assign handler functions as props and merge the other ones
    const records = this.state.records.map((record) =>
      <Record
        key={`record-${record.id}`}
        handleDetailClick={this.handleDetailClick}
        handleCardSelected={this.handleCardSelected}
        {...record}
      />
    );
    return (
      <div>
        <div ref="category" className={`category ${this.props.title.toLowerCase()} grid-x`}>
          <h3>{this.props.title}</h3>
          <MediaQuery query="(min-width: 1224px)">
            <RecordCarousel records={records} />
          </MediaQuery>
          <MediaQuery query="(max-width: 1224px)">
            <div className="mobile-records">
              {records}
            </div>
          </MediaQuery>
        </div>
        {
          this.state.cardDetail &&
            <div className="category grid-x bla" style={{backgroundColor: 'black', height: '400px'}} />
        }
      </div>
    )
  }

  handleDetailClick(clickedId) {
    this.setState({cardDetail: clickedId});
  }

  handleCardSelected(selectedId) {
    const records = [];
    this.state.records.forEach(record => {
      // deep clone record, only works with primitive data types and without recursive elements
      const newRecord = JSON.parse(JSON.stringify(record));
      newRecord.card.selected = record.id === selectedId;
      records.push(newRecord);
    });
    this.setState({records: records});
  }
}

export default Records;
