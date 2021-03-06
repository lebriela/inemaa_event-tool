import React, {Component} from 'react';

class WishListButton extends Component {
  render() {
    return (
      <button className="wish-list-button button secondary" type="button" onClick={this.props.handleWishListClick}>
        <i className="fa fa-2x fa-paperclip"></i>
        Merkzettel
        <span className="right">{this.props.count}</span>
      </button>
    );
  }
}

export default WishListButton;
