import React from "react";
import "../../assets/css/adminContent.css";
import { Sidebar } from "../Sidebar";
import { Link, Route, Routes } from "react-router-dom";
import UpdateHotel from "../../pages/hotel/UpdateHotel";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function AdminHotelUpdate() {
  return (
    <div
      className="dashboard"
      style={{ background: "#dde6ed", padding: "20px" }}
    >
      <Sidebar />
      <div className="dashboard--content">
        <Link to={"/admin/hotels"}>
          <button className="bg-slate-700 rounded-xl text-white  text-4xl">
            <IoMdArrowRoundBack />
          </button>
        </Link>
        <div className="ml-20 bg-slate-1000 rounded-lg">
          <Routes>
            <Route path="/" element={<UpdateHotel />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
