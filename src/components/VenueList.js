import React, { Component } from 'react';
import ListItem from './ListItem';

//list view of all the 12 Chicago organic venues 
export default class VenueList extends Component {
  render() {
    return (
      <ol className="venueList">
        {this.props.venues &&
          this.props.venues.map((venue, idx) =>
            <ListItem
              key={idx} {...venue}
              handleListItemClick={this.props.handleListItemClick}
            />
          )}
      </ol>
    )
  }
}