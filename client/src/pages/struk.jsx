import React from "react";

export default function Struk() {
  return (
    <div className="p-6">
      <div className="text-center py-4 border-b-2 border-gray-300">
        <p>
          MIRAE CARWASH <br /> Jl. Inspeksi Kalimalang <br /> No.3, RT.1/RW.3,
          Pd.Kelapa, <br /> Kota Jakarta Timur <br /> 085179962334
        </p>
      </div>
      <div className="py-4 border-b border-gray-300">
        <div className="flex justify-between">
          <span className="text-left">TRX-12345543</span>
          <span className="text-right">
            Minggu, 11 November 2024 <br />
            22.08
          </span>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">Dapit</span>
          <span>Honda Vario 125 2015 | E1234 IF</span>
          <span>Honda Beat 2015 | E1234 IH</span>
        </div>
      </div>
      <div className="py-4">
        <div>
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
      </div>
      <div className="text-center py-4 border-b-2 border-gray-300">
        <p className="my-2">Kasir : Admin | Bayar : Cash</p>
        <span>
          Jika ada bagian yang terlewatkan kirim <br /> photo/video pada kami,
          Beri kami <br /> kesempatan perbaiki. <br /> Terimakasih 🙏.
        </span>
      </div>
    </div>
  );
}
