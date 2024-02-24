import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/SideBar";
import AddButton from "../../components/Button/AddButton";
import { getData } from "../../utils/fetch";

export default function Booking() {
  const [book, setbook] = useState([]);
  const [role, setRole] = useState("");

  const fetchbook = async () => {
    try {
      const res = await getData(`/book`);
      setbook(res.data.bookings);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setRole(JSON.parse(localStorage.getItem("role")));
    fetchbook();
  }, []);

  console.log(book);

  return (
    <>
      <div>
        <Navbar />
        <Sidebar />

        <div className="p-4 sm:ml-64">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl">Manajemen book</h1>
              {role === "Admin" ? <AddButton to="/book/add" /> : null}
            </div>

            {/* table */}
            {book.length === null ? (
              <h1>TIdak ada data</h1>
            ) : (
              <div class="mt-14 relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-6 py-3">
                        Admin
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Supervisor
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Driver
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Vehicle
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Pickup Date
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Destination
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {book.map((data, index) => (
                      <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {data.admin.name}
                        </th>
                        <td className="px-6 py-4">{data.supervisor.name}</td>
                        <td className="px-6 py-4">{data.driver.name}</td>
                        <td className="px-6 py-4">{data.vehicle.name}</td>
                        <td className="px-6 py-4">{data.pickup_date}</td>
                        <td className="px-6 py-4">{data.destination}</td>
                        <td className="px-6 py-4">{data.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
