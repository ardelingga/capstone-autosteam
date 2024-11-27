import React from "react";
import { Banknote } from "lucide-react";
import NavMobile from "@/components/nav-mobile";

export default function TambahProduk() {
  return (
    <>
      <NavMobile title={"Tambah Produk Baru"} />
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">Tambah Produk</h1>
        <div className="space-y-4 mb-16">
          <div className="bg-white shadow-md rounded-lg p-4 mb-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center justify-center text-3xl bg-[#4498f8] text-gray-500 p-6 rounded-3xl w-12 h-12">
                🥚
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Nama Produk"
                  className="py-2 text-2xl font-bold w-full focus:outline-none caret-[#4498f8]"
                />
              </div>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center justify-center text-3xl bg-[#4498f8] text-gray-500 p-6 rounded-3xl w-12 h-12">
                💸
              </div>
              <div>
                <input
                  type="text"
                  placeholder="0"
                  className="py-2 text-xl font-bold w-full focus:outline-none caret-[#4498f8]"
                />
              </div>
            </div>
          </div>
          <div className="fixed flex bottom-0 left-0 w-full text-white text-center px-6 py-2 justify-between items-center">
            <button className="w-full bg-primary p-4 rounded-3xl font-bold">
              Simpan
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
