import { FC, useState} from "react";
import { TopBar } from "./TopBar";
import { GoogleMap } from "./GMaps";

const log = (...args: any[]) => console.log("App -->", ...args);

interface Marker {
   title: string;
   type: string;
}

const App:FC<object> = () => {
  const [action, setAction] = useState<null | 'reposition'| 'zoom'| 'addMarker'>(null);
  const [lat, setLat] = useState<number>(-34.397);
  const [lng, setLng] = useState<number>(150.644);
  const [zoom, setZoom] = useState<number>(8);
  const [newMarkerTitle, setNewMarkerTitle] = useState<string>('');
  const [newMarkerType, setNewMarkerType] = useState<string>('');
  const [markers, setMarkers] = useState<Marker[]>([]);

  const reposition = (city: string) => {
    setAction('reposition');
    switch (city) {
      case "tel aviv":
        setLat(32.0042938);
        setLng(34.7615399);
        break;
      case "Novosibirsk":
        setLat(55.02152447273033);
        setLng(82.91228750425842);
        break;
      case "New York":
        setLat(40.71055333585353);
        setLng(-74.02917237756196);
        break;
      default:
        alert("wrong city");
    }
  }

  const updateZoom = (zoomLevel: number) => {
    setAction('zoom');
    setZoom(zoomLevel);
  }

  const addMarkerTitle = (title: string) => {
    setAction(null);
    setNewMarkerTitle(title);
  }

  const addMarkerType = (type: string) => {
    setAction(null);
    setNewMarkerType(type);
  }

  const addMarker = () => {
    setAction('addMarker');
    setMarkers((prevMarkers) => {
      return [...prevMarkers,
        {
          title: newMarkerTitle,
          type: newMarkerType
        }
      ]}
    )
  }

  return (
    <div className="app">
      <TopBar><h1>Google Maps Example in React</h1></TopBar>
      <div className="hbox mb20">
        <button onClick={() => reposition("tel aviv")}>Tel Aviv</button>
        <button onClick={() => reposition("Novosibirsk")}>Novosibirsk</button>
        <button onClick={() => reposition("New York")}>New York</button>
        <input type="number" min="8" max="16" placeholder="8"
          onChange={(event) => updateZoom(event.target.valueAsNumber)}
        />
      </div>
      <div className="hbox mb20">
        <input name="title" type="text"
           onChange={(event) => addMarkerTitle(event.target.value)}
        />
        <select name="type"
          onChange={(event) => addMarkerType(event.target.value)}
        >
          <option value="Cafe">Cafe</option>
          <option value="Diner">Diner</option>
        </select>
        <button onClick={() => addMarker()}>Add marker</button>
      </div>
      <GoogleMap lat={lat} lng={lng} zoom={zoom} markers={markers} action={action} />
    </div>
  );
}

export { App };