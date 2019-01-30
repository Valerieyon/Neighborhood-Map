import React, { Component } from "react";
import "./App.css";
import Map from "./components/Map";
import FoursquareAPI from "./API/"

class App extends Component {
  componentDidMount(){
    FoursquareAPI.search({
      near:"Des Plaines,IL",
      query:"pho",
      limit:10
    }).then(results => console.log(results));
  }

  render() {
    return (
      <div className="App">
        <Map/>
      </div>
    );
  }
}

export default App;
