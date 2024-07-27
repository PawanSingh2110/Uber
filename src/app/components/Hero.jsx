"use client";
import React from "react";
import Booking from "./Booking";
import Carlist from "./Carlist";
import Payment from "./Payment";
import Mapblock from "../components/map/Mapblock";
import { useState } from "react";
import { useEffect } from "react";
import { SourceCoordinate } from "../../../context/SourceCoordinate";
import { DestinationCoords } from "../../../context/DestinationCoords";
import { Direction } from "../../../context/Direction";
import { UserLocation } from "../../../context/UserLocation";


const Hero = () => {
  const [sourcecoords, setSourcecoords]=useState(null);
  const [destinationcoords, setDestinationcoords]=useState(null);
  const[direction,setDirection]=useState()

  const [userlocation, setUserLocation] = useState({
    lng: null,
    lat: null,
  });

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log(position);
      setUserLocation({
        ...userlocation,
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
    // console.log(setUserLocation)
  };

  useEffect(() => {
   const location = setInterval(()=>{

     getCurrentLocation();
   },5000)
   return () => clearInterval(location);
  }, [location]);

  return (
    <div>
      <SourceCoordinate.Provider value={{sourcecoords, setSourcecoords}} >
      <DestinationCoords.Provider value={{destinationcoords, setDestinationcoords}} >
        <Direction.Provider value={{direction,setDirection}}>
          <UserLocation.Provider value={{userlocation, setUserLocation}} >
    
   
      <div className=" p-4 grid grid-cols-1 lg:grid-cols-3  w-full  ">
        <div className="lg:col-span-1 order-last lg:order-first  border-black border-[1px] rounded-2xl p-4 ">
          <Booking />
          <Carlist />
          <Payment />
        </div>
        <div className="lg:col-span-2  order-first lg:order-last p-5 ">
          <Mapblock />
        </div>
      </div>
      </UserLocation.Provider>
      </Direction.Provider>
      </DestinationCoords.Provider>
      
    </SourceCoordinate.Provider>
    </div>
  );
};

export default Hero;
