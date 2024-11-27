import dashboardIcon from '../assets/images/dashboard/dashboard.png';
import transactionIcon from '../assets/images/dashboard/transaction.png';
import productIcon from '../assets/images/dashboard/vehicle.png';
import employeeIcon from '../assets/images/dashboard/empploy.png';

export const menuItems = [
  {
    id: 1,
    title: 'Dashboard',
    icon: dashboardIcon,
    route: '/dashboard',
  },
  {
    id: 2,
    title: 'Transaksi',
    icon: transactionIcon,
    route: '/transaksi',
  },
  {
    id: 3,
    title: 'Produk',
    icon: productIcon,
    route: '/produk',
  },
  {
    id: 4,
    title: 'Pegawai',
    icon: employeeIcon,
    route: '/pegawai',
  },
];
