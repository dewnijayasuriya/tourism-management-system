import React from "react";
import "../../assets/css/adminContent.css";
import { Sidebar } from "../Sidebar";
import { Link, Route, Routes } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import UpdateTrain from "../../pages/train/UpdateTrain";

export default function AdminTrainUpdate() {
  return (
    <div
      className="dashboard"
      style={{ background: "#dde6ed", padding: "20px" }}
    >
      <Sidebar />
      <div className="dashboard--content">
        <Link to={"/admin/train"}>
          <button className="bg-slate-700 rounded-xl text-white  text-4xl">
            <IoMdArrowRoundBack />
          </button>
        </Link>
        <div className="ml-6 bg-slate-100 rounded-lg">
          <Routes>
            <Route path="/" element={<UpdateTrain />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
