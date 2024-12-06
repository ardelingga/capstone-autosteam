import NavMobile from "@/components/nav-mobile";
import { CalendarDays } from "lucide-react";
import React, { useEffect, useState } from "react";
import apiService from "../services/api-services";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

export default function Transaksi() {
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Function untuk mengambil data transaksi
    const initTransactionPage = async () => {
        setIsLoading(true);
        try {
            const reqTransaction = await apiService.get("/transactions");
            if (reqTransaction.status === "success") {
                setTransactions(reqTransaction.data);
            }
        } catch (err) {
            console.error("Error fetching transactions:", err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        initTransactionPage();
    }, []);

    return (
        <div>
            <NavMobile title={"Transaksi"} />
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
            <div className="pl-6 pr-6">
                {isLoading ? (
                    <div className="flex justify-center items-center h-[200px]">
                        <ClipLoader color="#2563EB" loading={isLoading} size={50} />
                    </div>
                ) : (
                    transactions.map((transaction) => (
                        <div
                            key={transaction.id}
                            className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between mb-4"
                        >
                            {/* Left Section */}
                            <div className="flex flex-col">
                                <p className="text-black font-bold">
                                    {transaction.code_transaction}
                                </p>
                                <p className="text-gray-500">
                                    {transaction.customer ? transaction.customer.name : "Unknown Customer"}
                                </p>
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
                    <i className="fas fa-wallet"></i>
                  </span>
                                    <span className="text-yellow-600 font-semibold">
                    {transaction.payment_method
                        ? transaction.payment_method.name
                        : "Unknown Method"}
                  </span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {/* Floating Button */}
            <Link
                to={"/transaksi/tambah-transaksi"}
                className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition duration-300"
            >
                +
            </Link>
        </div>
    );
}
