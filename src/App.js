
import React, { Component } from "react";
import "./App.css";
import Map from "./components/Map";
import FoursquareAPI from "./API/";
import CheeseburgerMenu from 'cheeseburger-menu'
import HamburgerMenu from 'react-hamburger-menu'
import SideBar from './components/SideBar';

class App extends Component {
  constructor() {
    super();
    this.state = {
      venues: [],
      markers: [],
      center: [],
      zoom: 9,
      updateSuperState: obj => {
        this.setState(obj);
      },
      menuOpen: false
    };
  }
  openMenu() {
    this.setState({ menuOpen: true })
  }

  closeMenu() {
    this.setState({ menuOpen: false })
  }
  closeAllMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    });
    this.setState({ markers: Object.assign(this.state.markers, markers) });
  }
  handleMarkerClick = (marker) => {
    this.closeAllMarkers();
    marker.isOpen = true;
    this.setState({ markers: Object.assign(this.state.markers, marker) });
    const venue = this.state.venues.find(venue => venue.id === marker.id);
    FoursquareAPI.getVenueDetails(marker.id).then(result => {
      const newVenue = Object.assign(venue, result.response.venue);
      this.setState({ venues: Object.assign(this.state.venues, newVenue) });

    })
    
  }
  // setAnimationToBounce = (marker) => {
  //   google.maps.event.addListener(marker, 'click', function() {
  //     marker.setAnimation(google.maps.Animation.BOUNCE); 
  //   });
  // }
  handleListItemClick = (venue) => {
    const marker = this.state.markers.find(marker => marker.id === venue.id);
    this.handleMarkerClick(marker);
    this.closeMenu();
    // this.setAnimationToBounce();
  }
  
  componentDidMount() {
    FoursquareAPI.search({
      near: "Manhattan,NY",
      query: "organic",
      limit: 12
    }).then(results => {
      const { venues } = results.response;
      const { center } = results.response.geocode.feature.geometry;
      const markers = venues.map(venue => {
        return {
          lat: venue.location.lat,
          lng: venue.location.lng,
          isOpen: false,
          isVisible: true,
          id: venue.id
        }
      });
      this.setState({ venues, center, markers });
      //console.log(results)
    });
  }

  render() {
    return (
      <div className="App">
        <p id="sideBarHint">Click TAB then ENTER or on green bar for list view of all the locations from Foursquare</p>
        <CheeseburgerMenu
          isOpen={this.state.menuOpen}
          closeCallback={this.closeMenu.bind(this)}>
          <SideBar {...this.state} handleListItemClick={this.handleListItemClick} closeCallback={this.closeMenu.bind(this)} />
        </CheeseburgerMenu>
        <HamburgerMenu
          isOpen={this.state.menuOpen}
          menuClicked={this.openMenu.bind(this)}
          width={35}
          height={450}
          strokeWidth={300}
          rotate={0}
          color='green'
          borderRadius={0}
          animationDuration={1}
        />
        
        <Map {...this.state} handleMarkerClick={this.handleMarkerClick} />
      </div>
    );
  }
}

export default App;
