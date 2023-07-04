import { Component } from "react";
import { TopBar } from "./TopBar";
import { GoogleMap } from "./GMaps";

const log = (...args: any[]) => console.log("App -->", ...args);

interface Marker {
   title: string;
   type: string;
}

interface State {
  action: null | 'reposition'| 'zoom'| 'addMarker';
  lat: number;
  lng: number;
  zoom: number;
  newMarkerTitle: string;
  newMarkerType: string;
  markers: Marker[];
}

export class App extends Component<object, State> {
  state = {
    action: null,
    lat: -34.397,
    lng: 150.644,
    zoom: 8,
    newMarkerTitle: '',
    newMarkerType: '',
    markers: [],
  };

  reposition = (city: string) => {
    switch (city) {
      case "tel aviv":
        this.setState({ action: 'reposition', lat: 32.0042938, lng: 34.7615399});
        break;
      case "Novosibirsk":
        this.setState({ action: 'reposition', lat: 55.02152447273033, lng: 82.91228750425842  });
        break;
      case "New York":
        this.setState({ action: 'reposition', lat: 40.71055333585353, lng: -74.02917237756196});
        break;
      default:
        alert("wrong city");
    }
  }

  zoom = (zoomLevel: number) => {
    this.setState({action: 'zoom', zoom: zoomLevel})
  }

  addMarkerTitle = (title: string) => {
    this.setState({action: null, newMarkerTitle: title})
  }

  addMarkerType = (type: string) => {
    this.setState({action: null, newMarkerType: type})
  }

  addMarker = () => {
    this.setState({
      markers: [...this.state.markers,
        {
          title: this.state.newMarkerTitle,
          type: this.state.newMarkerType
        }
      ],
      action: 'addMarker'}
    )
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
        <div className="hbox mb20">
          <input name="title" type="text"
             onChange={(event) => this.addMarkerTitle(event.target.value)}
          />
          <select name="type"
            onChange={(event) => this.addMarkerType(event.target.value)}
          >
            <option value="Cafe">Cafe</option>
            <option value="Diner">Diner</option>
          </select>
          <button onClick={() => this.addMarker()}>Add marker</button>
        </div>
        <GoogleMap lat={this.state.lat} lng={this.state.lng} zoom={this.state.zoom} markers={this.state.markers} action={this.state.action} />
      </div>
    );
  }
}
