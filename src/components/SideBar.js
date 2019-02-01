import React, { Component } from 'react';
import VenueList from './VenueList';

export default class SideBar extends Component {
  render() {
    return (
      <div className="sideBar">
        <input type={"search"} id={"search"} placeholder={"Find Venues"}/>
        <VenueList {...this.props} handleListItemClick={this.props.handleListItemClick}/>
      </div>
    )
  }
}