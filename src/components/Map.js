/* global google */
import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    zoom={props.zoom}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
    center={props.center}
  >
    {props.markers &&
      props.markers.filter(marker => marker.isVisible).map((marker, idx, arr) => {
        const venueInfo = props.venues.find(venue => venue.id === marker.id)
         console.log(venueInfo);
        return (
        <Marker
          key={idx}
          position={{ lat: marker.lat, lng: marker.lng }}
          onClick={() => props.handleMarkerClick(marker)}
          animation = {marker.isOpen === true ? google.maps.Animation.BOUNCE : google.maps.Animation.DROP}
        >
           {marker.isOpen && venueInfo.bestPhoto && (
            <InfoWindow>
              <React.Fragment>
                <img src={`${venueInfo.bestPhoto.prefix}180x180${venueInfo.bestPhoto.suffix}`} alt={"Venue front or Products sold in venue"} />
                <p>{venueInfo.name}</p>
                <p>address: {venueInfo.location.address}</p>
                <p>call us: {venueInfo.contact.phone}</p>
              </React.Fragment>
            </InfoWindow>)}
        </Marker>
        )
      }
      )}
  </GoogleMap>
))

export default class Map extends Component {
  render() {
    return (
      <MyMapComponent
        {...this.props}
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBJAQphhfpxArJ40EuKiTXb9qGytot_Flg"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%`, width: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    )
  }
}