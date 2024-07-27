import React from 'react'



const Navbar = () => {
  return (
    <div className="flex px-10 py-5 shadow-2xl justify-between items-center ">
        <div>
            {/* <h1 className="text-3xl font-medium cursor-pointer">LOgo</h1> */}
            <img src="/image/taxilogo.png" alt="Taxi Logo" className="w-16" />
        </div>
        <div>
            <ul className="flex gap-5 ">
                <li className="cursor-pointer font-medium">Home</li>
                <li className="cursor-pointer font-medium">About</li>
                <li className="cursor-pointer font-medium">Contact</li>
            </ul>
        </div>
        <button className="bg-black text-white p-2 rounded-xl">
            logOut
        </button>
    </div>
  )
}

export default Navbar