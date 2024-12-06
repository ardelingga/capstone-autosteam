import NavMobile from "@/components/nav-mobile";
import { ChevronUp } from "lucide-react";
import { ChevronsRight } from "lucide-react";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function TransaksiStep3() {
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();
  console.log("Step-3 data", data);

  const [customer, setCustomer] = useState({
    id: null,
    name: "",
    phone_number: "",
  });
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [vehicleData, setVehicleData] = useState(
    data.detail_transactions
      .filter(item => item.type === "jasa")
      .map(item => ({
        id: item.id,
        vehicleDetails: Array(item.quantity).fill({
          namaKendaraan: "",
          jenisKendaraan: "",
          platNomor: "",
        }),
        selectedEmployees: [],
      }))
  );

  const handleVehicleChange = (vehicleIndex, fieldName, value, vehicleId) => {
    setVehicleData(prevData =>
        prevData.map(vehicle => {
          if (vehicle.id === vehicleId) {
            const updatedVehicleDetails = vehicle.vehicleDetails.map((detail, index) => {
              if (index === vehicleIndex) {
                return { ...detail, [fieldName]: value };
              }
              return detail;
            });
            return { ...vehicle, vehicleDetails: updatedVehicleDetails };
          }
          return vehicle;
        })
    );
  };

  const handleEmployeeChange = (employeeName, isChecked) => {
    setSelectedEmployees(prevSelectedEmployees => {
      if (isChecked) {
        // Tambahkan employee ke dalam array
        return [...prevSelectedEmployees, employeeName];
      } else {
        // Hapus employee dari array
        return prevSelectedEmployees.filter(employee => employee !== employeeName);
      }
    });
  };

  const handleNextTransaction = () => {
    data.customer = customer;
    data.employees_array_text = selectedEmployees.toString();
    data.detail_transactions = data.detail_transactions.map((item, index) => {
      if (item.type === "jasa") {
        return {
          ...item,
          vehicles: vehicleData[index].vehicleDetails,
        };
      }
      return item;
    });
    navigate("/transaksi/transaksi-step-4", { state: data });
  };

  return (
    <>
      <NavMobile title={"Transaksi"} />
      <div className="p-6">
        <div className="space-y-4 mb-16">
          {data.detail_transactions.map((item, index) => {
            if (item.type === "jasa") {
              return (
                <div key={index}>
                  <h1 className="text-xl font-bold mb-4">
                    Isi Data Kendaraan dan Petugas
                  </h1>
                  <div className="flex flex-col bg-white shadow-md rounded-lg p-4 mb-10">
                    <div className="flex items-center justify-between w-full mb-7">
                      <div className="flex items-center gap-4">
                        <div className="text-3xl">
                          <img width={50} src={item.image_url} alt=""/>
                        </div>
                        <div>
                        <p className="font-semibold text-gray-800">
                            {item.name}
                          </p>
                          <p className="bg-blue-500 text-white text-center font-medium w-[100px] rounded-[8px]">
                            {item.price}
                          </p>
                        </div>
                      </div>
                      <div>
                        <ChevronUp />
                      </div>
                    </div>

                    {vehicleData
                        .filter(vehicle => vehicle.id === item.id)
                        .map(vehicle =>
                            vehicle.vehicleDetails.map((vehicleDetail, index) => (
                                <div key={index}>
                                  <h3 className="text-l font-bold mb-2">Data Kendaraan</h3>
                                  <div className="mb-5">
                                    <div className="flex flex-col mb-4">
                                      <label htmlFor={`nama-kendaraan-${index}`}>Nama Kendaraan {index + 1}</label>
                                      <input
                                          type="text"
                                          id={`nama-kendaraan-${index}`}
                                          value={vehicleDetail.namaKendaraan}
                                          placeholder="Vario 125 2015"
                                          className="border-b border-gray-300 py-1 text-sm placeholder-gray-300 focus:outline-none"
                                          onChange={e =>
                                              handleVehicleChange(index, 'namaKendaraan', e.target.value, vehicle.id)
                                          }
                                      />
                                    </div>
                                    <div className="flex flex-col mb-4">
                                      <label htmlFor={`jenis-kendaraan-${index}`}>Jenis Kendaraan {index + 1}</label>
                                      <select
                                          id={`jenis-kendaraan-${index}`}
                                          value={vehicleDetail.jenisKendaraan}
                                          onChange={e =>
                                              handleVehicleChange(index, 'jenisKendaraan', e.target.value, vehicle.id)
                                          }
                                          className="bg-white py-1 border-b border-gray-300"
                                      >
                                        <option value="Motor">Motor</option>
                                        <option value="Mobil">Mobil</option>
                                      </select>
                                    </div>
                                    <div className="flex flex-col mb-4">
                                      <label htmlFor={`plat-nomor-${index}`}>Plat Nomor Kendaraan {index + 1}</label>
                                      <input
                                          type="text"
                                          id={`plat-nomor-${index}`}
                                          value={vehicleDetail.platNomor}
                                          placeholder="B 45XX AC"
                                          className="border-b border-gray-300 py-1 text-sm placeholder-gray-300"
                                          onChange={e =>
                                              handleVehicleChange(index, 'platNomor', e.target.value, vehicle.id)
                                          }
                                      />
                                    </div>
                                  </div>
                                </div>
                            ))
                        )}

                    <div>
                      <h3 className="text-l font-bold mb-4">Petugas Pelaksana</h3>
                      <div className="mb-5">
                        {["Dapit", "Akhsan", "Lingga"].map((employee, idx) => (
                          <div key={idx} className="flex items-center mb-4">
                            <input
                              id={`checkbox-${employee}`}
                              type="checkbox"
                              className="w-4 h-4 text-blue-600 border-red-500 rounded"
                              // checked={vehicle.selectedEmployees.includes(employee)}
                              onChange={e => handleEmployeeChange(employee, e.target.checked)}
                            />
                            <label htmlFor={`checkbox-${employee}`} className="ms-2 text-sm font-medium text-gray-900">
                              {employee}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })}
          <h1 className="text-xl font-bold mb-4">Isi Data Pelanggan (Optional)</h1>
          <div className="flex flex-col bg-white shadow-md rounded-lg p-4">
            <div>
              <h3 className="text-l font-bold mb-4">Data Pelanggan</h3>
              <div className="flex flex-col mb-4">
                <label htmlFor="nama-kendaraan">Nama Pelanggan</label>
                <input
                  type="text"
                  value={customer.name}
                  onChange={e => setCustomer({ ...customer, name: e.target.value })}
                  placeholder="Andri Wijaya"
                  className="border-b border-gray-300 py-1 text-sm placeholder-gray-300"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="nama-kendaraan">No Telp Pelanggan</label>
                <input
                  type="number"
                  value={customer.phone_number}
                  placeholder="0811112312XXX"
                  onChange={e => setCustomer({ ...customer, phone_number: e.target.value })}
                  className="border-b border-gray-300 py-1 text-sm placeholder-gray-300"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="fixed flex bottom-0 left-0 w-full bg-primary text-white text-center px-6 py-2 justify-between items-center">
          <div className="flex gap-3 items-center">
            <p className="text-black">Total</p>
            <p className="font-bold text-xl text-black">
              Rp. {data.grand_total.toLocaleString("id-ID")}
            </p>
          </div>
          <div className="flex items-center">
            <button
              className="bg-[#6FBF73] text-black py-2 px-4 rounded-3xl flex gap-3"
              onClick={handleNextTransaction}
            >
              Lanjut <ChevronsRight />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
