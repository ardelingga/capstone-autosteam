import NavMobile from "@/components/nav-mobile";
import { CalendarDays } from "lucide-react";
import React, { useEffect, useState } from "react";
import apiService from "../services/api-services";
import { Link, useNavigate } from "react-router-dom";


export default function Transaksi() {

  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);


  // function to init the transaction page
  const initTransactionPage = async () => {
    try {
      const reqTrasaction = await apiService.get("/transactions");

      console.log("PRINT REQUEST");
      console.log(reqTrasaction);

      console.log("PRINT DATA : ", reqTrasaction.data);

      if (reqTrasaction.status === "success") {
        setTransactions(reqTrasaction.data);
      }

      console.log("PRINT DATA : ", transactions);

    } catch (err) {
      console.log(err.message);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    initTransactionPage();
  }, []);

  return (
    <div>
      <NavMobile title={"Dashboard"} />
      <div className="mt-6">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6 gap-3">
            <h1 className="text-xl font-bold">Transaksi</h1>
            <div className="text-gray-500 flex items-center gap-2">
              <span className="text-xs">
                (1 November 2024 - 2 November 2024)
              </span>
              <button className="text-black">
                <CalendarDays />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="pl-6 pr-6">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between mb-4"
            >
              {/* Left Section */}
              <div className="flex flex-col">
                <p className="text-black font-bold">
                  {transaction.code_transaction}
                </p>
                <p className="text-gray-500">{transaction.customer ? transaction.customer.name : "Unknown Customer"}</p>
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-sm font-semibold mt-2">
                  {transaction.grand_total}
                </span>
              </div>

              {/* Right Section */}
              <div className="flex flex-col items-end">
                <span className="bg-[#FF9800] text-white px-3 py-1 rounded-md text-[9px] font-semibold mb-2">
                  {transaction.created_at}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-600">
                    {/* Replace with an appropriate icon */}
                    <i className="fas fa-wallet"></i>
                  </span>
                  <span className="text-yellow-600 font-semibold">
                    {transaction.payment_method ? transaction.payment_method.name : "Unknown Method"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Floating Button */}
      <Link to={"/transaksi/tambah-transaksi"}
        className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition duration-300"
      >
        +
      </Link>
    </div>
  );
}
