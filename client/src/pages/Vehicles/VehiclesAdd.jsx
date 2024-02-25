import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/SideBar";
import { postData } from "../../utils/fetch";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SubmitButton from "../../components/Button/SubmitButton";
import Input from "../../components/Input/Input";

export default function VehiclesAdd() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    type: "",
    last_service: "",
    location: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "Anda yakin menambahkan vehicle ini?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });
    if (result.isConfirmed) {
      const res = await postData(`/vehicle`, form);

      if (res?.data?.message) {
        toast.success(res?.data?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        navigate("/vehicles");
      } else {
        toast.error(res?.response?.data?.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  console.log(form);

  return (
    <div>
      <Navbar />
      <Sidebar />

      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <h1 className="text-3xl">Add Vehicles</h1>

          <form className="max-w-sm mt-16" onSubmit={handleSubmit}>
            <Input
              type={"text"}
              label="Nama Vehicle"
              id="name"
              name="name"
              placeholder="Mobil xx"
              onChange={handleChange}
              required
            />
            <Input
              type={"text"}
              label="Tipe"
              id="type"
              name="type"
              placeholder="Alat Berat"
              onChange={handleChange}
              required
            />
            <Input
              type={"date"}
              label="Terakhir Di-service"
              id="last_service"
              name="last_service"
              onChange={handleChange}
              required
            />
            <Input
              type={"text"}
              label="Lokasi"
              id="location"
              name="location"
              placeholder="Tambang XX"
              onChange={handleChange}
              required
            />
            <SubmitButton label={"Tambahkan Barang"} />
          </form>
        </div>
      </div>
    </div>
  );
}
