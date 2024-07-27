import React from "react";
import { Marker } from "react-map-gl";
import { useContext } from "react";
import { SourceCoordinate } from "../../../../context/SourceCoordinate";
import { FaMapMarkerAlt } from "react-icons/fa";
import { DestinationCoords } from "../../../../context/DestinationCoords";
import "mapbox-gl/dist/mapbox-gl.css";
import { UserLocation } from "../../../../context/UserLocation";

const Markers = () => {
  const { sourcecoords, setSourcecoords } = useContext(SourceCoordinate);
  const { destinationcoords, setDestinationcoords } =
    useContext(DestinationCoords);
  const { userlocation } = useContext(UserLocation);

  return (
    <div>
      <Marker longitude={userlocation?.lng} latitude={userlocation?.lat}>
        <FaMapMarkerAlt size={25} style={{ color: "green" }} />
      </Marker>

      {sourcecoords && sourcecoords.length !== 0 ? (
        <Marker longitude={sourcecoords?.lng} latitude={sourcecoords?.lat}>
          <FaMapMarkerAlt size={25} style={{ color: "red" }} />
        </Marker>
      ) : null}

      {destinationcoords && destinationcoords.length !== 0 ? (
        <Marker
          longitude={destinationcoords?.lng}
          latitude={destinationcoords?.lat}
        >
          <FaMapMarkerAlt size={25} style={{ color: "blue" }} />
        </Marker>
      ) : null}
    </div>
  );
};

export default Markers;
