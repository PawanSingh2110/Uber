"use client"
import React from "react";
import Data from "../../app/data";
import { useState } from "react";

const Carlist = () => {
    const [selected,setSelected]=useState("")
  return (
    <div className="mt-5 p-4">
      <h1 className="text-lg font-medium">Select Car</h1>
     <div className=" grid grid-cols-2 gap-4 md:grid-cols-3  ">
     {
        Data.map((item, i) =>{
            return (
              <div key={i} className="mb-5  ">
                <div className={`w-full  p-2 border rounded-2xl ${i === selected? 'bg-yellow-300 rounded-2xl ': null}`} onClick={()=>{setSelected(i)}} >
                  <img src={item.logo} alt="" height={90} width={75} className="w-full mt-3 " />
                  <div className="flex justify-between  text-sm px-3">
                    <h1 className="text-[12px] font-medium flex">{item.name}
                        <span className="px-16 md:px-28 lg:px-10  text-green-600 ">${item.charge}</span>
                    </h1>
                    
                  </div>
                </div>
              </div>
            )
        })
     }
     </div>
    </div>
  );
};

export default Carlist;
