import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import API from "../api";

function OutbreakMap() {

  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/diseases/outbreaks")
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <MapContainer
      center={[15.5, 78.5]}
      zoom={6}
      style={{ height: "400px", width: "100%" }}
    >

      <TileLayer
        attribution="OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {data.map((d, i) => (
        <Marker key={i} position={[15.5, 78.5]}>
          <Popup>
            <b>{d.disease_name}</b><br/>
            Village: {d.village}<br/>
            District: {d.district}<br/>
            Cases: {d.cases}
          </Popup>
        </Marker>
      ))}

    </MapContainer>
  );
}

export default OutbreakMap;