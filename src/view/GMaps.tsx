import React, { Component } from "react";

const log = (...args: any[]) => console.log("GoogleMap -->", ...args);

interface Marker {
  title: string;
  type: string;
}

interface Props {
  action: null | 'reposition'| 'zoom'| 'addMarker';
  lat: number;
  lng: number;
  zoom: number;
  markers: Marker[];
}

export class GoogleMap extends Component<Props> {

  mapRef = React.createRef<HTMLDivElement>();
  theMap: google.maps.Map | null = null;

  shouldComponentUpdate(nextProps: Props) {
    log("shouldComponentUpdate >>>>");

    const map = this.theMap as google.maps.Map;

    switch (nextProps.action) {
      case "reposition":
        map.setCenter({ lat: nextProps.lat, lng: nextProps.lng });
        log('action reposition done');
        break;

      case "zoom":
        map.setZoom(nextProps.zoom);
        break;

      case "addMarker":
        nextProps.markers.forEach((marker) => {
          const newMarker = new google.maps.Marker({
            position: map.getCenter(),
            map: map,
            title: marker.title,
          });

          const contentString = `
              <div id="content">
                <div id="siteNotice"></div>
                <h1 class="firstHeading">${marker.title}</h1>
                <h2>${marker.type}</h2>
                <div id="bodyContent">
                  <p>Some other info</p>
                </div>
              </div>
          `;

          const infowindow = new google.maps.InfoWindow({
            content: contentString,
            ariaLabel: marker.title,
          });

          newMarker.addListener("click", () => {
            infowindow.open({
              anchor: newMarker,
              map: map,
            });
          });
        });
        break;
    }

    return false;
  }

  componentDidMount() {
    // log(this.mapRef);
    this.theMap = new google.maps.Map(this.mapRef.current as HTMLDivElement, {
      center: { lat: this.props.lat, lng: this.props.lng },
      zoom: this.props.zoom
    });
  }

  render() {
    return <div ref={this.mapRef} className="map-box" />;
  }

}
