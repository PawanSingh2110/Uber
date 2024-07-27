"use client";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { SourceCoordinate } from "../../../context/SourceCoordinate";
import { DestinationCoords } from "../../../context/DestinationCoords";

const Booking = () => {
  const [source, setSource] = useState("");
  const [sourceAddress, setSourceAddress] = useState([]);
  const [destination, setDestination] = useState("");
  const [destinationAddress, setDestinationAddress] = useState([]);

  const { sourcecoords, setSourcecoords } = useContext(SourceCoordinate);
  const {destinationcoords, setDestinationcoords} =useContext(DestinationCoords);

  //    source....................
  const getAddress = async () => {
    const response = await fetch(
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        source +
        ".json?proximity=ip&limit=2&access_token=pk.eyJ1IjoicGF3YW4tc2luZ2giLCJhIjoiY2x5OG04czlhMGs3MzJqczdqZTQxdzdkMCJ9.9hJYde5isDb9oy7qQbI62g",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();

    setSourceAddress(result);
  };

  useEffect(() => {
    if (source) {
      getAddress();
    } else {
      setSourceAddress([]);
    }
  }, [source]);

  //   destination...................

  const getDestAddress = async () => {
    const response = await fetch(
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        destination +
        ".json?proximity=ip&limit=2&access_token=pk.eyJ1IjoicGF3YW4tc2luZ2giLCJhIjoiY2x5OG04czlhMGs3MzJqczdqZTQxdzdkMCJ9.9hJYde5isDb9oy7qQbI62g",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();

    setDestinationAddress(result);
  };

  useEffect(() => {
    if (destination) {
      getDestAddress();
    } else {
      setDestinationAddress([]);
    }
  }, [destination]);

  ///lat and long for tehe map

  const onSourceChange = async (item) => {
    setSource(item.place_name);
    setSourceAddress([]);

    const response = await fetch(
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        source +
        ".json?proximity=ip&access_token=pk.eyJ1IjoicGF3YW4tc2luZ2giLCJhIjoiY2x5OG04czlhMGs3MzJqczdqZTQxdzdkMCJ9.9hJYde5isDb9oy7qQbI62g",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();

    setSourcecoords({
      lng: result.features[0].geometry.coordinates[0],
      lat: result.features[0].geometry.coordinates[1],
    });
  };
  const onDestinationChange = async (item) => {
    setDestination(item.place_name);
    setDestinationAddress([]);

    const response = await fetch(
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        destination +
        ".json?proximity=ip&access_token=pk.eyJ1IjoicGF3YW4tc2luZ2giLCJhIjoiY2x5OG04czlhMGs3MzJqczdqZTQxdzdkMCJ9.9hJYde5isDb9oy7qQbI62g",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();

    setDestinationcoords({
      lng: result.features[0].geometry.coordinates[0],
      lat: result.features[0].geometry.coordinates[1],
    });
  };

  return (
    <div className="border-2 border-orange-400 rounded-xl p-5 ">
      <h1 className="text-xl font-medium">Booking</h1>
      <div className="flex flex-col relative mt-3">
        <label htmlFor="">Source ?</label>
        <input
          type="text"
          name=""
          id=""
          value={source}
          placeholder="Enter Your Source"
          className="p-2 caret-orange text-lg outline-0 border rounded-xl "
          onChange={(e) => {
            setSource(e.target.value);
          }}
        />
        {sourceAddress?.features && (
          <div className="absolute z-40 bg-white p-1 top-16 border ">
            {sourceAddress.features.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSourceChange(item);
                }}
              >
                <h1 className="p-1 cursor-pointer">{item.place_name}</h1>
                <hr />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col mt-4 relative">
        <label htmlFor="">Destination ?</label>
        <input
          type="text"
          name=""
          id=""
          value={destination}
          placeholder="Enter Your Destination"
          className="p-2 caret-orange text-lg outline-0 border rounded-xl"
          onChange={(e) => {
            setDestination(e.target.value);
          }}
        />
        {destinationAddress?.features && (
          <div className="absolute z-40 bg-white p-1 top-16 border ">
            {destinationAddress.features.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onDestinationChange(item);
                }}
              >
                <h1 className="p-1 cursor-pointer">{item.place_name}</h1>
                <hr />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
