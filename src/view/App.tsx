import { Component } from "react";
import { TopBar } from "./TopBar";
import { GoogleMap } from "./GMaps";
// const log = (...args) => console.log.apply(null, ["App -->", ...args]);
const log = (...args: any[]) => console.log("App -->", ...args);


interface State {
  lat: number;
  lng: number;
  zoom: number;
}

export class App extends Component<object, State> {
  state = {
    lat: -34.397,
    lng: 150.644,
    zoom: 8,
  };

  reposition(city: string) {
    switch (city) {
      case "tel aviv":
        this.setState({ lat: 32.0042938, lng: 34.7615399 });
        break;
      case "Novosibirsk":
        this.setState({ lat: 55.02152447273033, lng: 82.91228750425842 });
        break;
      case "New York":
        this.setState({ lat: 40.71055333585353, lng: -74.02917237756196 });
        break;
      default:
        alert("wrong city");
    }
  }

  zoom(zoomLevel: number) {
    this.setState({zoom: zoomLevel})
  }

  render() {
    log(this.state);
    return (
      <div className="app">
        <TopBar><h1>Google Maps Example in React</h1></TopBar>
        <div className="hbox mb20">
          <button onClick={() => this.reposition("tel aviv")}>Tel Aviv</button>
          <button onClick={() => this.reposition("Novosibirsk")}>Novosibirsk</button>
          <button onClick={() => this.reposition("New York")}>New York</button>
          <input type="number" min="8" max="16" placeholder="8"
            onChange={(event) => this.zoom(event.target.valueAsNumber)}
          />
        </div>
        <GoogleMap lat={this.state.lat} lng={this.state.lng} zoom={this.state.zoom} />
      </div>
    );
  }
}
