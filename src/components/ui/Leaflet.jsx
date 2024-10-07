import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
export default function Leaflet({ coordinates, capital }) {
  return (
    <div id="map">
      <MapContainer center={coordinates} zoom={9} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <Marker position={coordinates}>
          <Popup>{capital}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
