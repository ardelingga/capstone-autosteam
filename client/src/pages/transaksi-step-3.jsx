import NavMobile from "@/components/nav-mobile";
import { ChevronUp } from "lucide-react";
import { ChevronsRight } from "lucide-react";
import React, { useState } from "react";

export default function TransaksiStep3() {
  return (
    <>
      <NavMobile title={"Transaksi"} />
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">
          Isi Data Kendaraan dan Petugas
        </h1>
        <div className="space-y-4 mb-16">
          <div className="flex flex-col bg-white shadow-md rounded-lg p-4 mb-10">
            <div className="flex items-center justify-between w-full mb-7">
              <div className="flex items-center gap-4">
                <div className="text-3xl">🛵</div>
                <div>
                  <p className="font-semibold text-gray-800">
                    Cuci Motor Kecil
                  </p>
                  <p className="bg-blue-500 text-white text-center font-medium w-[100px] rounded-[8px]">
                    Rp 15.000
                  </p>
                </div>
              </div>
              <div>
                <ChevronUp />
              </div>
            </div>
            <div>
              <h3 className="text-l font-bold mb-2">Data Kendaraan</h3>
              <div className="mb-5">
                <div className="flex flex-col mb-4">
                  <label htmlFor="nama-kendaraan">Nama Kendaraan</label>
                  <input
                    type="text"
                    placeholder="Vario 125 2015"
                    className="border-b border-gray-300 py-1 text-sm placeholder-gray-300"
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label htmlFor="nama-kendaraan">Jenis Kendaraan</label>
                  <select
                    name=""
                    id=""
                    className="bg-white py-1 border-b border-gray-300 text-gray-300"
                  >
                    <option value="Motor" className="text-xl text-gray-300">
                      Motor
                    </option>
                  </select>
                </div>
                <div className="flex flex-col mb-4">
                  <label htmlFor="nama-kendaraan">Plat Nomor Kendaraan</label>
                  <input
                    type="text"
                    placeholder="B 45XX AC"
                    className="border-b border-gray-300 py-1 text-sm placeholder-gray-300"
                  />
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-l font-bold mb-4">Petugas Pelaksana</h3>
              <div className="mb-5">
                <div class="flex items-center mb-4">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 border-red-500 rounded"
                  />
                  <label
                    for="default-checkbox"
                    class="ms-2 text-sm font-medium text-gray-900 "
                  >
                    Dapit
                  </label>
                </div>
                <div class="flex items-center mb-4">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 border-red-500 rounded"
                  />
                  <label
                    for="default-checkbox"
                    class="ms-2 text-sm font-medium text-gray-900 "
                  >
                    Akhsan
                  </label>
                </div>
                <div class="flex items-center mb-4">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 border-red-500 rounded"
                  />
                  <label
                    for="default-checkbox"
                    class="ms-2 text-sm font-medium text-gray-900 "
                  >
                    Lingga
                  </label>
                </div>
              </div>
            </div>
          </div>
          <h1 className="text-xl font-bold mb-4">
            Isi Data Pelanggan (Optional)
          </h1>
          <div className="flex flex-col bg-white shadow-md rounded-lg p-4">
            <div>
              <h3 className="text-l font-bold mb-4">Data Pelanggan</h3>
              <div className="flex flex-col mb-4">
                <label htmlFor="nama-kendaraan">Nama Pelanggan</label>
                <input
                  type="text"
                  placeholder="Andri Wijaya"
                  className="border-b border-gray-300 py-1 text-sm placeholder-gray-300"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="nama-kendaraan">No Telp Pelanggan</label>
                <input
                  type="text"
                  placeholder="0811112312XXX"
                  className="border-b border-gray-300 py-1 text-sm placeholder-gray-300"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="fixed flex bottom-0 left-0 w-full bg-blue-500 text-white text-center px-6 py-2 justify-between items-center">
          <div className="flex gap-3 items-center">
            <p className="text-black">Total</p>
            <p className="font-bold text-xl text-black">Rp 28.000</p>
          </div>
          <div className="flex items-center">
            <button className="bg-[#6FBF73] text-black py-2 px-4 rounded-3xl flex gap-3">
              Lanjut <ChevronsRight />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
