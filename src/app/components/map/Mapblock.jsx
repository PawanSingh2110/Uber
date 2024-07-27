"use client";

import React, { useContext, useEffect, useRef } from "react";
import Map, { Marker } from "react-map-gl";
import Markers from "./Markers";
import { SourceCoordinate } from "../../../../context/SourceCoordinate";
import { DestinationCoords } from "../../../../context/DestinationCoords";
import { useState } from "react";
import { Direction } from "../../../../context/Direction";
import Routes from "./Routes";
import { UserLocation } from "../../../../context/UserLocation";

const MapComponent = () => {
  const mapRef = useRef(null);
  const { sourcecoords, setSourcecoords } = useContext(SourceCoordinate);
  const { destinationcoords, setDestinationcoords } =
    useContext(DestinationCoords);
  const { direction, setDirection } = useContext(Direction);
  const{userlocation}=useContext(UserLocation);

  useEffect(() => {
    if (mapRef.current && sourcecoords) {
      mapRef.current.flyTo({
        center: [sourcecoords.lng, sourcecoords.lat],
        zoom: 16,
        essential: true,
        duration: 3000,
      });
    }
  }, [sourcecoords]);
  useEffect(() => {
    if (mapRef.current && destinationcoords) {
      mapRef.current.flyTo({
        center: [destinationcoords.lng, destinationcoords.lat],
        zoom: 16,
        essential: true,
        duration: 3000,
      });
    }
    if (sourcecoords && destinationcoords) {
      getDirection();
    }
  }, [destinationcoords]);

  useEffect(() => {
    if(userlocation)
    {
      mapRef.current?.flyTo({
        center: [userlocation?.lng, userlocation?.lat],
        duration: 2500,
      });
    }
  }, [userlocation]);
  const getDirection = async () => {
    const res = await fetch(
      "https://api.mapbox.com/directions/v5/mapbox/driving/" +
        sourcecoords.lng +
        "," +
        sourcecoords.lat +
        ";" +
        destinationcoords.lng +
        "," +
        destinationcoords.lat +
        "?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=pk.eyJ1IjoicGF3YW4tc2luZ2giLCJhIjoiY2x5OG04czlhMGs3MzJqczdqZTQxdzdkMCJ9.9hJYde5isDb9oy7qQbI62g",
      {
        headers: {
          "Content-Type": "application/json()",
        },
      }
    );
    const result = await res.json();
    setDirection(result);
    console.log(result);
  };

  return (
    <div className="relative">
      <h1 className="text-2xl font-medium px-5 absolute z-20">Map</h1>
      <div className=" sm:w-96 sm:h-96 md:h-4/5  lg:w-[900px] rounded-3xl overflow-hidden">
        <Map
          ref={mapRef}
          mapboxAccessToken="pk.eyJ1IjoicGF3YW4tc2luZ2giLCJhIjoiY2x5ZTBxdnc3MDlhZzJqczRrNjR0eGRuNSJ9.MH-QYcLcxHV_GhFvABfiNQ"
          initialViewState={{
            longitude: userlocation?.lng,
            latitude: userlocation?.lat,
            zoom: 14,
          }}
          style={{ width: "100%", height: "80vh" }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        >
          <Markers />
          <Routes coordinates={direction?.routes[0]?.geometry.coordinates} />
        </Map>
      </div>
    </div>
  );
};

export default MapComponent;
