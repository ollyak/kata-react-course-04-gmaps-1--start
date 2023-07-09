import {FC, useEffect, useRef} from "react";

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

const GoogleMap: FC<Props> = ({action, lat, lng, zoom, markers}) => {
  const mapRef = useRef<HTMLDivElement|null>(null);
  const theMap = useRef<google.maps.Map|null>(null);

  useEffect(() => {
    setTimeout(() => {
      theMap.current = new google.maps.Map(mapRef.current as HTMLDivElement, {
        center: { lat: lat, lng: lng },
        zoom: zoom
      });
    }, 500);

  }, []);

  useEffect(() => {
    switch (action) {
      case "reposition":
        theMap?.current?.setCenter({ lat: lat, lng: lng });
        log('action reposition done');
        break;

      case "zoom":
        theMap?.current?.setZoom(zoom);
        break;

      case "addMarker":
        markers.forEach((marker) => {
          const newMarker = new google.maps.Marker({
            position: theMap?.current?.getCenter(),
            map: theMap?.current,
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
              map: theMap?.current,
            });
          });
        });
        break;
    }
  }, [action, lat, lng, zoom, markers]);

   return (<div ref={mapRef} className="map-box" />);
}

export { GoogleMap };