import NavMobile from "@/components/nav-mobile";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Keranjang() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const [cartItems, setCartItems] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [quantities, setQuantities] = useState(() => {
    const quantities = [];
    data.detail_transactions.forEach((item) => {
      item.quantity = 1;
      quantities.push(1);
    });
    return quantities;
  });

  const handleQuantityChange = (index, action) => {
    console.log("EXECUTED INCREMENT DECREMENT QUANTITY");
    console.log("INDEX & ACTION", index, action);

    if (action === "increment") {
      data.detail_transactions[index].quantity += 1;
      setQuantities((prevQuantities) => {
        const newQuantities = [...prevQuantities];
        newQuantities[index] += 1;
        return newQuantities;
      });
      setGrandTotal(quantities[index] * data.detail_transactions[index].price);
    } else if (action === "decrement") {
      data.detail_transactions[index].quantity -= 1;
      setQuantities((prevQuantities) => {
        const newQuantities = [...prevQuantities];
        newQuantities[index] -= 1;
        return newQuantities;
      });
      setGrandTotal(quantities[index] * data.detail_transactions[index].price);
    }

    console.log("PRINT DATA TRANSAKSI : ", data.grand_total);
  };

  const handleRemoveItem = (id) => {
    data.detail_transactions = data.detail_transactions.filter(
      (item) => item.id !== id
    );
    setCartItems(data.detail_transactions);
    setGrandTotal(
      data.detail_transactions
        .map((item) => item.quantity * item.price)
        .reduce((a, b) => a + b, 0)
    );
  };

  const handleNextStepTransaction = () => {
    navigate("/transaksi/transaksi-step-3", { state: data });
    // console.log(data);
  };

  useEffect(() => {
    setGrandTotal(
      data.detail_transactions
        .map((item) => item.quantity * item.price)
        .reduce((a, b) => a + b, 0)
    );
    data.grand_total = grandTotal;
    console.log("PRINT DATA TRANSAKSI : ", data.grand_total);
    console.log("PRINT DATA TRANSAKSI : ", data);
  });

  return (
    <>
      <NavMobile title={"Keranjang Transaksi"} />
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">Keranjang Item Transaksi</h1>
        <div className="space-y-4">
          {data.detail_transactions.map((item, index) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white shadow-md rounded-lg p-4"
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl">
                  <img src={item.image_url} alt={item.name} width={50} />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{item.name}</p>
                  <p className="text-blue-500 font-medium">
                    Rp {item.price.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-md">
                  <button
                    onClick={() => handleQuantityChange(index, "decrement")}
                    className="px-2 py-1 text-gray-700 font-bold hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4">{quantities[index]}</span>
                  <button
                    onClick={() => handleQuantityChange(index, "increment")}
                    className="px-2 py-1 text-gray-700 font-bold hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
          <div className="fixed flex bottom-0 left-0 w-full bg-primary text-white text-center px-6 py-2 justify-between items-center">
            <div className="flex gap-3 items-center">
              <p className="text-black">Total</p>
              <p className="font-bold text-xl text-black">
                Rp {grandTotal.toLocaleString()}
              </p>
            </div>
            <div className="flex items-center">
              <button
                className="bg-[#6FBF73] text-black py-2 px-4 rounded-3xl flex gap-3"
                onClick={handleNextStepTransaction}
              >
                Lanjut <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
