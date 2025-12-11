import React from "react";
import logo from "../../../assets/logo.jpg";

const Header = () => (
  <div className="flex items-center justify-between  ">
    <img src={logo} alt="" className=" w-50 max-w-full object-contain" />
    <div className="flex items-center gap-3 md:gap-10">
      <a href="#">Home</a>
      <a href="#">Caterogy</a>
      <a href="#">Event</a>
      <a href="#">Profile</a>
    </div>
    <div className="flex gap-4">
      <input
        type="text"
        placeholder="Search"
        className=" search rounded-full   px-4 py-1 outline-none border-none w-40 md:w-64"
      />
      <span className="text-blue-900 bg-blue-900 w-12 h-12 rounded-full inline-block"></span>
    </div>
  </div>
);
export default Header;
