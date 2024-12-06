// import ModalTransaksi from "@/components/modal-transaksi";
import NavMobile from "@/components/nav-mobile";
import axios from "axios";
import { Banknote } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import apiService from "../services/api-services";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TransaksiStep4() {
  const location = useLocation();
  const data = location.state;
  const [paymentMethod, setPaymentMethod] = useState([]);
  const [moneyChanges, setMoneyChanges] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [formattedValue, setFormattedValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const initPaymentMethod = async () => {
    try {
      const reqPaymentMethod = await apiService.get("/payment-methods");
      if (reqPaymentMethod.status === "success") {
        setPaymentMethod(reqPaymentMethod.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const formatNumber = (num) => {
    return num.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleSelectedPaymentMethod = (id) => {
    data.payment_method_id = id;
    console.log(data);
  };

  const handleChangeTotalPayment = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setFormattedValue(formatNumber(value));
    setTotalPayment(Number(value));
  };

  const handleExactChange = () => {
    const value = data.grand_total.toString();
    setFormattedValue(formatNumber(value));
    setTotalPayment(data.grand_total);
    console.log("formatted value", formattedValue);
  };

  function mapPayloadBeforeSending(data) {

    const mappedDetailTransactions = data.detail_transactions.map(item => {

      const mappedVehicles = item.vehicles?.map(vehicle => ({
        id: null,
        name: vehicle.namaKendaraan,
        type: vehicle.jenisKendaraan || 'Motor',
        plate_number: vehicle.platNomor
      })) || null;

      return {
        product_id: item.id,
        product_code: item.code,
        product_name: item.name,
        product_type: item.type,
        quantity: item.quantity,
        price: item.price,
        total_price: item.price * item.quantity,
        vehicles: mappedVehicles
      };
    });

    const mappedCustomer = {
      id: null,
      name: data.customer.name,
      phone_number: Number(data.customer.phone_number)
    };

    const mappedPayload = {
      grand_total: data.grand_total,
      payment_method_id: data.payment_method_id,
      total_payment: data.total_payment,
      money_changes: data.money_changes,
      detail_transactions: mappedDetailTransactions,
      customer: mappedCustomer,
      employees_array_text: data.employees_array_text
    };

    return mappedPayload;
  }

  const handleAddTransaction = async () => {
    try {
      data.total_payment = totalPayment;
      data.money_changes = moneyChanges;
      const cleanedData = mapPayloadBeforeSending(data);
      console.log("PRINT DATA : ");
      console.log(cleanedData);
      // const modifiedDetailTransactions = data.detail_transaction.map((item) => {
      //   return {
      //     product_id: item.id,
      //     product_code: item.code,
      //     product_name: item.name,
      //     product_type: item.type,
      //     quantity: item.quantity,
      //     price: item.price,
      //     total_price: item.quantity * item.price,
      //     vehicles: [
      //       {
      //         id: null,
      //         name: "Toyota Avanza",
      //         type: "Mobil",
      //         plate_number: "B 134 IY",
      //       },
      //     ],
      //   };
      // });
      //
      // delete data.detail_transaction;
      // data.detail_transactions = modifiedDetailTransactions;


      const reqAddTransaction = await apiService.post("/transactions", cleanedData);
      if (reqAddTransaction.status === "success") {
        console.log(reqAddTransaction.data);
        setIsOpen(true);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    if (totalPayment < data.grand_total) {
      setMoneyChanges(0);
    } else {
      setMoneyChanges(totalPayment - data.grand_total);
    }
    console.log("money changes", moneyChanges);
    console.log("total payment", totalPayment);
  }, [totalPayment, moneyChanges]);

  useEffect(() => {
    initPaymentMethod();
  }, []);

  return (
    <>
      <NavMobile title={"Transaksi"}></NavMobile>
      <div className="p-6">
        <div className="flex flex-col bg-white shadow-md rounded-lg p-4 mb-10">
          <div className="flex items-center gap-4">
            <div className="text-3xl">💸</div>
            <div>
              <p>Total Harga Transaksi</p>
              <p className="font-bold text-2xl text-gray-800">
                {data.grand_total.toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        </div>
        <h1 className="text-xl font-bold mb-4">Pembayaran</h1>
        <div className="flex flex-col mb-4">
          <label htmlFor="nama-kendaraan">Metode Pembayaran</label>
          <Select onValueChange={(id) => handleSelectedPaymentMethod(id)}>
            <SelectTrigger className="w-full border-b  p-0 ">
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {paymentMethod.map((item, index) => {
                  return (
                    <SelectItem key={index} value={item.id}>
                      {item.name}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="nama-kendaraan">Jumlah Bayar</label>
          <input
            type="number"
            placeholder="50.000"
            className="border-b border-gray-300 py-1 text-sm placeholder-gray-300 focus:outline-none"
            value={formattedValue}
            onChange={handleChangeTotalPayment}
          />
        </div>

        <span
          className="w-32 flex gap-2 justify-center bg-[#FFC400] text-black p-1 rounded-2xl shadow-xl"
          onClick={handleExactChange}
        >
          <Banknote /> Uang Pas
        </span>
        <div className="fixed flex flex-col bottom-0 left-0 w-full bg-white border-t border-black text-white  px-6 py-2">
          <div className="text-black">
            <p>Kembalian</p>
            <p className="font-bold text-xl">
              Rp. {formatNumber(moneyChanges.toString())}
            </p>
          </div>
          <div className="my-2">
            <div className="relative">
              <button
                className="bg-[#6FBF73] w-full p-2.5 shadow-md rounded-2xl text-xl font-bold"
                onClick={handleAddTransaction}
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
                    <div className="mt-4">
                      <p className="text-center font-bold my-6">
                        Transaksi Berhasil <br /> Ditambahkan!
                      </p>
                      <p className="text-center font-bold text-black mt-2">
                        TRX-1731146732726
                      </p>

                      <div className="mt-6 space-y-4 font-semibold border-b pb-4">
                        <div className="flex justify-between">
                          <span>Total Harga</span>
                          <span>Rp 28.000</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Bayar</span>
                          <span>Rp 50.000</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Kembalian</span>
                          <span>Rp 22.000</span>
                        </div>
                      </div>

                      <div className="mt-6 border-b pb-4">
                        <h3 className="font-bold mb-1">Info Customer</h3>
                        <table className="w-full">
                          <tbody>
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
                          </tbody>
                        </table>
                      </div>

                      <div className="mt-6 border-b pb-4">
                        <h3 className="font-bold mb-1">Detail Transaksi</h3>
                        <table className="table-fixed">
                          <tbody>
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
                          </tbody>
                        </table>
                      </div>
                      <div className="mt-4">
                        <table className="table-fixed">
                          <tbody>
                            <tr className="">
                              <td className="w-1/3 text-left">Total</td>
                              <td className="w-1/3 text-left">Rp 28.000</td>
                            </tr>
                          </tbody>
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
          </div>
        </div>
      </div>
    </>
  );
}
