
import React, { Component } from "react";
import "./App.css";
import Map from "./components/Map";
import FoursquareAPI from "./API/";
import CheeseburgerMenu from 'cheeseburger-menu'
import HamburgerMenu from 'react-hamburger-menu'
import SideBar from './components/SideBar';


window.gm_authFailure = function () {
  alert(`
   Google Maps failed to load!
   
   You may have exceeded your Google Maps Api quota
   or you are using an invalid API key.`);
}

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
  //opens side bar
  openMenu() {
    this.setState({ menuOpen: true })
  }
  //closes the side bar
  closeMenu() {
    this.setState({ menuOpen: false })
  }
  //restarts all the markers
  closeAllMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    });
    this.setState({ markers: Object.assign(this.state.markers, markers) });
  }
  //gets the venue details from Foursquare
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
  //finds the corresponding marker for the clicked venue in the side bar
  handleListItemClick = (venue) => {
    const marker = this.state.markers.find(marker => marker.id === venue.id);
    this.handleMarkerClick(marker);
    this.closeMenu();
  }
  //handles the button click to show the side bar; the button is used for accessibility purpose
  handleClick = () => {
    if (this.state.menuOpen === false) {
      this.openMenu();
    }
  }

  componentDidMount() {
    FoursquareAPI.search({
      near: "Chicago,IL",
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
      })
      this.setState({ venues, center, markers });
    });
  }

  render() {
    return (
      <main>
        <div
          className="App"
          role="application"
          aria-label="Map of Chicago locations with organic products"
        >
          <p
            id="sideBarHint"
            tabIndex="1">Click TAB then ENTER or on green bar for list view of all the locations from Foursquare
            </p>

          <button //displays the side bar with the search textbox and all the venues
            className="hamburgerContainer"
            tabIndex="2"
            aria-label="Toggle side menu"
            onClick={this.handleClick}
          >
            <CheeseburgerMenu
              isOpen={this.state.menuOpen}
              closeCallback={this.closeMenu.bind(this)}
            >
              <SideBar {...this.state}
                handleListItemClick={this.handleListItemClick}
              />
            </CheeseburgerMenu>
            <HamburgerMenu
              isOpen={this.state.menuOpen}
              menuClicked={this.openMenu.bind(this)}
              strokeWidth={3}
              height={22}
              color={"green"}
            />
          </button>
          <Map {...this.state} //displays the map
            handleMarkerClick={this.handleMarkerClick}
          />
        </div>
      </main>

    );
  }
}

export default App;
