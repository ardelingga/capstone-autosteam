import ModalTransaksi from "@/components/modal-transaksi";
import NavMobile from "@/components/nav-mobile";
import { Banknote } from "lucide-react";
import React, { useState } from "react";

export default function TransaksiStep4() {
  return (
    <>
      <NavMobile title={"Transaksi"}></NavMobile>
      <div className="p-6">
        <div className="flex flex-col bg-white shadow-md rounded-lg p-4 mb-10">
          <div className="flex items-center gap-4">
            <div className="text-3xl">💸</div>
            <div>
              <p>Total Harga Transaksi</p>
              <p className="font-bold text-2xl text-gray-800">28.000</p>
            </div>
          </div>
        </div>
        <h1 className="text-xl font-bold mb-4">Pembayaran</h1>
        <div className="flex flex-col mb-4">
          <label htmlFor="nama-kendaraan">Metode Pembayaran</label>
          <input
            type="text"
            placeholder="Cash"
            className="border-b border-gray-300 py-1 text-sm placeholder-gray-300"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="nama-kendaraan">Jumlah Bayar</label>
          <input
            type="text"
            placeholder="50.000"
            className="border-b border-gray-300 py-1 text-sm placeholder-gray-300"
          />
        </div>
        <span className="w-32 flex gap-2 justify-center bg-[#FFC400] text-black p-1 rounded-2xl shadow-xl">
          <Banknote /> Uang Pas
        </span>
        <div class="fixed flex flex-col bottom-0 left-0 w-full bg-white border-t border-black text-white  px-6 py-2">
          <div className="text-black">
            <p>Kembalian</p>
            <p className="font-bold text-xl">Rp 22.000</p>
          </div>
          <div className="my-2">
            <ModalTransaksi />
          </div>
        </div>
      </div>
    </>
  );
}
