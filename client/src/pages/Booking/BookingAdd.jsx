import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/SideBar";
import { getData, postData } from "../../utils/fetch";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SubmitButton from "../../components/Button/SubmitButton";
import Input from "../../components/Input/Input";
import SelectInput from "../../components/Input/SelectInput";

export default function BookingAdd() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    supervisor_id: "",
    driver_id: "",
    vehicle_id: "",
    pickup_date: "",
    destination: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "Anda yakin booking vehicle ini?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });
    if (result.isConfirmed) {
      const res = await postData(`/book`, form);

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

        navigate("/booking");
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

  const [supervisor, setSupervisor] = useState([]);
  const fetchSupervisor = async () => {
    try {
      const res = await getData("/users/supervisors");
      const data = res.data.map((element) => ({
        id: element.id,
        name: element.name,
      }));
      setSupervisor(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [driver, setdriver] = useState([]);
  const fetchdriver = async () => {
    try {
      const res = await getData("/users/drivers");
      const data = res.data.map((element) => ({
        id: element.id,
        name: element.name,
      }));
      setdriver(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [vehicle, setvehicle] = useState([]);
  const fetchvehicle = async () => {
    try {
      const res = await getData("/vehicle");
      const data = res.data.map((element) => ({
        id: element.id,
        name: element.name,
      }));
      setvehicle(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSupervisor();
    fetchdriver();
    fetchvehicle();
  }, []);

  console.log(form);

  return (
    <div>
      <Navbar />
      <Sidebar />

      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <h1 className="text-3xl">Booking Vehicles</h1>

          <form className="max-w-sm mt-16" onSubmit={handleSubmit}>
            <SelectInput
              id="supervisor_id"
              name={"supervisor_id"}
              label="Supervisor"
              options={supervisor}
              onChange={handleChange}
            />
            <SelectInput
              id="driver_id"
              name={"driver_id"}
              label="Driver"
              options={driver}
              onChange={handleChange}
            />
            <SelectInput
              id="vehicle_id"
              name={"vehicle_id"}
              label="Vehicle"
              options={vehicle}
              onChange={handleChange}
            />
            <Input
              type={"date"}
              label="Pickup Date"
              id="pickup_date"
              name="pickup_date"
              onChange={handleChange}
              required
            />
            <Input
              type={"text"}
              label="Destination"
              id="destination"
              name="destination"
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
