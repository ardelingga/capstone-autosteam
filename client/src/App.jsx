import * as history from "history";
import { BrowserRouter } from "react-router-dom";
import Layouts from "./layout/layouts";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import Home from "./pages/home";
import Transaksi from "./pages/transaksi";
import AddTransaksi from "./pages/add-transksi";
import Keranjang from "./pages/keranjang";
import DetailTransaksi from "./pages/transaksi-step-3";
import TransaksiStep3 from "./pages/transaksi-step-3";
import TransaksiStep4 from "./pages/transaksi-step-4";
import TambahProduk from "./pages/tambah-product";
import Struk from "./pages/struk";

function App() {
  const browserHistory = history.createBrowserHistory();

  return (
    <BrowserRouter history={browserHistory}>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transaksi" element={<Transaksi />} />
        <Route path="/transaksi/tambah-transaksi" element={<AddTransaksi />} />
        <Route path="/transaksi/keranjang" element={<Keranjang />} />
        <Route path="/transaksi/transaksi-step-3" element={<TransaksiStep3 />} />
        <Route path="/transaksi/transaksi-step-4" element={<TransaksiStep4 />} />
        <Route path="/struk" element={<Struk />} />
        <Route path="/tambah-procduk" element={<TambahProduk />} />
        {/* <Layouts>
        </Layouts> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
