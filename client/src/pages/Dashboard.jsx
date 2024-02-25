import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/SideBar";
import VehicleUsageChart from "../components/Chart/VehicleUsageChart ";
import { getData } from "../utils/fetch";

export default function Dashboard() {
  const [label, setLabel] = useState([]);
  const [data, setData] = useState([]);

  const fetchvehicles = async () => {
    try {
      const res = await getData(`/book/vehicle-usage`);
      let label = [];
      let usage_count = [];
      res.data.usage_counts.forEach((element) => {
        label.push(element.vehicle.name);
        usage_count.push(element.usage_count);
      });
      setLabel(label);
      setData(usage_count);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchvehicles();
  }, []);

  console.log(label);
  console.log(data);

  return (
    <div>
      <Navbar />
      <Sidebar />

      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <div>
            <h1 className="text-5xl text-center">Selamat Datang</h1>
            <VehicleUsageChart data={data} labels={label} />
          </div>
        </div>
      </div>
    </div>
  );
}
