import React, { useState } from "react";

export default function ModalTransaksi() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="bg-[#6FBF73] w-full p-2.5 shadow-md rounded-2xl text-xl font-bold"
        onSubmit={() => setIsOpen(true)}
      >
        Tambah Transaksi
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center text-black">
          <div className="bg-white rounded-lg w-full max-w-lg p-6 shadow-lg mt-32 overflow-y-auto max-h-screen">
            <div className="flex justify-between items-center border-b pb-4">
              <h2 className="text-xl font-semibold">Transaksi</h2>
              <button
                className="text-gray-600 hover:text-gray-800"
                onClick={() => setIsOpen(false)}
              >
                ×
              </button>
            </div>
            <div class="mt-4">
              <p class="text-center font-bold my-6">
                Transaksi Berhasil <br /> Ditambahkan!
              </p>
              <p class="text-center font-bold text-black mt-2">
                TRX-1731146732726
              </p>

              <div class="mt-6 space-y-4 font-semibold border-b pb-4">
                <div class="flex justify-between">
                  <span>Total Harga</span>
                  <span>Rp 28.000</span>
                </div>
                <div class="flex justify-between">
                  <span>Bayar</span>
                  <span>Rp 50.000</span>
                </div>
                <div class="flex justify-between">
                  <span>Kembalian</span>
                  <span>Rp 22.000</span>
                </div>
              </div>

              <div class="mt-6 border-b pb-4">
                <h3 class="font-bold mb-1">Info Customer</h3>
                <table className="w-full">
                  <tr>
                    <td className="w-1/2">Nama</td>
                    <td className="w-1/2">Zaki</td>
                  </tr>
                  <tr className="align-top">
                    <td>Nama Kendaraan</td>
                    <td className="align-top">
                      <ul>
                        <li>
                          - Honda Vario 125 2015 <br />{" "}
                          <span className="pl-2.5">E 1234 IF</span>
                        </li>
                        <li>
                          - Honda Beat 2015 <br />{" "}
                          <span className="pl-2.5">E 1234 IH</span>
                        </li>
                      </ul>
                    </td>
                  </tr>
                </table>
              </div>

              <div class="mt-6 border-b pb-4">
                <h3 class="font-bold mb-1">Detail Transaksi</h3>
                <table class="table-fixed">
                  <tr>
                    <td>CUCI MOTOR KECIL</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Rp 15.000</td>
                    <td>Rp 15.000</td>
                  </tr>
                  <tr>
                    <td>INDOMIE REBUS</td>
                  </tr>
                  <tr>
                    <td className="w-1/3">1</td>
                    <td className="w-1/3">Rp 8.000</td>
                    <td className="w-1/3">Rp 8.000</td>
                  </tr>
                  <tr>
                    <td>KOPI KAPAL API</td>
                  </tr>
                  <tr>
                    <td className="w-1/3">1</td>
                    <td className="w-1/3">Rp 5.000</td>
                    <td className="w-1/3">Rp 5.000</td>
                  </tr>
                </table>
              </div>
              <div className="mt-4">
                <table className="table-fixed">
                  <tr className="">
                    <td className="w-1/3 text-left">Total</td>
                    <td className="w-1/3 text-left">Rp 28.000</td>
                  </tr>
                </table>
              </div>
              <div className="my-10 pb-10 border-t border-black">
                <button className="w-full bg-[#FF9100] mt-6 font-bold text-white py-4 rounded-3xl shadow-lg">
                  Cetak Struk
                </button>
                <button className="w-full bg-[#6FBF73] mt-4 font-bold text-white py-4 rounded-3xl shadow-lg">
                  Selesai
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
