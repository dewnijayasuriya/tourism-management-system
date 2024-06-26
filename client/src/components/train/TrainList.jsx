import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/css/user/userList.css";
import loadingimg from "../../assets/img/loading.gif";
import { FcInfo } from "react-icons/fc";
import { MdDeleteForever } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";
import Swal from "sweetalert2";
import TrainReport from "./TrainReport";
import Modal from "react-modal";
import "./../../assets/css/train/seats.css";

export const TrainList = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    searchTerm: "",
    type: "all",
    from: "all",
    destination: "all",
    sort: "created_at",
    order: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get("searchTerm") || "";
    const type = urlParams.get("type") || "all";
    const from = urlParams.get("from") || "all";
    const destination = urlParams.get("destination") || "all";
    const sort = urlParams.get("sort") || "created_at";
    const order = urlParams.get("order") || "desc";
    setSearchData({ searchTerm, type, from, destination, sort, order });

    const fetchTrains = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/train/search?${searchQuery}`);
      const data = await res.json();
      setTrains(data);
      setLoading(false);
    };
    fetchTrains();
  }, [location.search]);
  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "Colombo Fort" ||
      e.target.id === "Galle" ||
      e.target.id === "Matara" ||
      e.target.id === "Badulla" ||
      e.target.id === "Hatton" ||
      e.target.id === "Batticaloa" ||
      e.target.id === "Vavuniya"
    ) {
      setSearchData({ ...searchData, from: e.target.id });
    }
    if (
      e.target.id === "all" ||
      e.target.id === "Colombo Fort" ||
      e.target.id === "Galle" ||
      e.target.id === "Matara" ||
      e.target.id === "Badulla" ||
      e.target.id === "Hatton" ||
      e.target.id === "Batticaloa" ||
      e.target.id === "Vavuniya"
    ) {
      setSearchData({ ...searchData, destination: e.target.id });
    }
    if (e.target.id === "searchTerm") {
      setSearchData({ ...searchData, searchTerm: e.target.value });
    }
    if (e.target.type === "select-one") {
      setSearchData({ ...searchData, [e.target.id]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParame = new URLSearchParams();
    urlParame.set("searchTerm", searchData.searchTerm);
    urlParame.set("type", searchData.type);
    urlParame.set("from", searchData.from);
    urlParame.set("destination", searchData.destination);
    const searchQuery = urlParame.toString();
    navigate(`/admin/train?${searchQuery}`);
  };

  const handleTrainDelete = async (trainID) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`/api/train/delete/${trainID}`, {
            method: "DELETE",
          });
          const data = await res.json();
          if (data.success === false) {
            console.log(data.message);
            return;
          }
          Swal.fire({
            title: "Deleted!",
            text: "Your train schedule has been deleted.",
            icon: "success",
          });
          setTrains((prev) => prev.filter((train) => train._id !== trainID));
        } catch (error) {
          console.log(error.message);
        }
      }
    });
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [seats, setSeats] = useState([]);

  const openModal = async (trainID) => {
    try {
      const res = await fetch(`/api/train/seats/${trainID}`);
      const data = await res.json();
      setSeats(data.seats);
      setModalIsOpen(true);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div className="mb-20">
        <div className="list--header">
          <div className="user--title">
            <h1>Train Management</h1>
            <div className="user--btn">
              <TrainReport trains={trains} searchData={searchData} />
            </div>
          </div>
          <br />
          <form onSubmit={handleSubmit}>
            <div className="search--line gap-3 text-center">
              <input
                type="text"
                placeholder="Search..."
                onChange={handleChange}
                id="searchTerm"
              />
              <select
                className="border p-3 rounded-lg"
                name="type"
                id="type"
                required
                onChange={handleChange}
              >
                <option className="text-slate-400" hidden>
                  Type
                </option>
                <option value="all">All</option>
                <option value="Express">Express</option>
                <option value="Intercity">Intercity</option>
                <option value="Slow">Slow</option>
              </select>
              <select
                className="border p-3 rounded-lg"
                name="from"
                id="from"
                required
                onChange={handleChange}
              >
                <option className="text-slate-400" hidden>
                  From
                </option>
                <option value="all">All</option>
                <option value="Colombo Fort">Colombo Fort</option>
                <option value="Galle">Galle</option>
                <option value="Matara">Matara</option>
                <option value="Badulla">Badulla</option>
                <option value="Hatton">Hatton</option>
                <option value="Batticaloa">Batticaloa</option>
                <option value="Vavuniya">Vavuniya</option>
              </select>
              <p className="mt-3 text-lg">to</p>
              <select
                className="border p-3 rounded-lg"
                name="destination"
                id="destination"
                required
                onChange={handleChange}
              >
                <option className="text-slate-400" hidden>
                  Destination
                </option>
                <option value="all">All</option>
                <option value="Colombo Fort">Colombo Fort</option>
                <option value="Galle">Galle</option>
                <option value="Matara">Matara</option>
                <option value="Badulla">Badulla</option>
                <option value="Hatton">Hatton</option>
                <option value="Batticaloa">Batticaloa</option>
                <option value="Vavuniya">Vavuniya</option>
              </select>

              <button className="bg-transparent hover:bg-blue-500 text-blue-900 font-semibold text-2xl  hover:text-white border border-blue-900 hover:border-transparent rounded ml-10 px-16">
                Search
              </button>
            </div>
          </form>

          <div className="list--container">
            {!loading && trains.length === 0 && (
              <p className="text-2xl text-center p-5 text-blue-950">
                No Trains found
              </p>
            )}
            {loading && (
              <div className="flex flex-col items-center justify-center">
                <img src={loadingimg} alt="loading" className="w-28" />
                <p className="text-lg w-full text-center">Loading....</p>
              </div>
            )}
            {!loading && trains.length > 0 && (
              <table className="list">
                <tbody>
                  <tr className="font-semibold text-blue-900 text-lg text-center">
                    <td>Train Name</td>
                    <td>Category</td>
                    <td>From</td>
                    <td>Departure Time</td>
                    <td>Destination</td>
                    <td>Arrival Time</td>
                    <td>Action</td>
                  </tr>
                  {trains.map((train) => (
                    <tr className="text-center">
                      <td>
                        <div className="user--details text-left ">
                          <h2>{train.trainName}</h2>
                        </div>
                      </td>
                      <td>{train.category}</td>
                      <td>{train.from}</td>
                      <td>{train.departureTime}</td>
                      <td>{train.destination}</td>
                      <td>{train.arrivalTime}</td>
                      <td>
                        <div className="flex flex-row gap-3 ">
                          <button
                            onClick={() => openModal(train._id)}
                            className="text-3xl text-blue-700 font-bold"
                          >
                            <FcInfo />
                          </button>
                          <Link to={`/admin/train/update/${train._id}`}>
                            <button className="text-green-700 text-3xl hover:text-green-400 focus:scale-95 transition-all duration-200 ease-out">
                              <MdEditSquare />
                            </button>
                          </Link>

                          <button
                            onClick={() => handleTrainDelete(train._id)}
                            className="text-3xl text-red-700 font-bold"
                          >
                            <MdDeleteForever />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <div className="modal-content bg-skyblue-200 rounded-lg p-6 relative">
          <button
            className="close-btn absolute top-0 right-0 mt-4 mr-4 bg-skyblue-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-skyblue-600"
            onClick={() => setModalIsOpen(false)}
          >
            X
          </button>
          <h2 className="text-xl font-bold mb-4">Seat Information</h2>
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 mr-2 bg-green-500 rounded-full"></div>
            <p className="text-sm text-skyblue-500">Available Seats</p>
          </div>
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 mr-2 bg-red-500 rounded-full"></div>
            <p className="text-sm text-skyblue-500">Booked Seats</p>
          </div>
          <div className="seats-container grid grid-cols-4 gap-4">
            {seats.map((seat, index) => (
              <div
                key={index}
                className={`seat ${
                  seat.available ? "bg-red-200" : "bg-green-200"
                } rounded-lg p-3 flex items-center justify-center`}
              >
                <p className="text-lg font-semibold">{seat.seatNumber}</p>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};
