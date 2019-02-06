import React, { Component } from 'react';
import ErrorBoundary from './ErrorBoundary';

//the component represents one venue in the list view defined in App.js
export default class ListItem extends Component {
  render() {
    return (
      <ErrorBoundary>
        <li className="listItem" onClick={() => this.props.handleListItemClick(this.props)} tabIndex="4">
          {/* image of the icon of the venue */}
          <img src={this.props.categories[0].icon.prefix + "32" + this.props.categories[0].icon.suffix} alt={this.props.categories[0].name} />
          {/* name of venue */}
          {this.props.name}
        </li>
      </ErrorBoundary>
    )
  }
}