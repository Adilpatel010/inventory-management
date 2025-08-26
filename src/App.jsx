import './assets/css/main.css'
import './assets/css/dashboard.css'
import './assets/css/warehouse.css'
import './assets/css/supplier.css'
import './assets/css/purchase.css'
import './assets/css/category.css'
import './assets/css/product.css'
import './assets/css/user.css'
import './assets/css/customer.css'
import './assets/css/adminlogin.css'
import './assets/css/stock.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/dashboard/Dashboard'
import { Routes, Route, useLocation } from 'react-router'
import AddWarehouse from './pages/warehouse/AddWarehouse'
import ListWarehouse from './pages/warehouse/ListWarehouse'
import AddSupplier from './pages/supplier/AddSupplier'
import ListSupplier from './pages/supplier/ListSupplier'
import AddPurchase from './pages/purchase/AddPurchase'
import ListPurchase from './pages/purchase/ListPurchase'
import ListCategory from './pages/category/ListCategory'
import AddCategory from './pages/category/Addcategory'
import AddProduct from './pages/product/AddProduct'
import ListProduct from './pages/product/ListProduct'
import { createContext, useEffect, useState } from 'react'
import AddUser from './pages/user/AddUser'
import ListUser from './pages/user/ListUser'
import Login from './pages/user/AdminLogin'
import ProtectedRoute from './components/ProtectedRoute'
import Logout from './pages/Logout'
import AddCustomer from './pages/sales/customer/Addcustomer'
import ListCustomer from './pages/sales/customer/Listcustomer'
import AddSales from './pages/sales/salesinfo/AddSales'
import ListSales from './pages/sales/salesinfo/ListSales'
import ListStock from './pages/stock/ListStock'
import UpdateStock from './pages/stock/UpdateStock'


const MyContext = createContext();

function App() {

  const [isToggleSidebar, setIsToggleSidebar] = useState(false)
  const location = useLocation();
  const values = {
    isToggleSidebar, setIsToggleSidebar
  }
  const isLoginPage = location.pathname === '/';
  // useEffect(() => {
  //   alert(isToggleSidebar)
  // }, [isToggleSidebar])

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>

      {!isLoginPage && (
        <MyContext.Provider value={values}>
          <Header />
          <div className='d-flex'>
            <div className={`sidebar-wrapper ${isToggleSidebar === true ? 'toggle' : ''}`}>
              <Sidebar />
            </div>
            <div style={{ height: "90vh", overflowY: "scroll" }}
              className={`content ${isToggleSidebar === true ? 'toggle' : ''}`}>
              <Routes>
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route path="/warehouse/add"
                  element={<ProtectedRoute><AddWarehouse /> </ProtectedRoute>} />
                <Route path='/warehouse/list'
                  element={<ProtectedRoute><ListWarehouse /></ProtectedRoute>} />
                <Route path='/supplier/add'
                  element={<ProtectedRoute><AddSupplier /></ProtectedRoute>} />
                <Route path='/supplier/list'
                  element={<ProtectedRoute><ListSupplier /></ProtectedRoute>} />
                <Route path='/purchase/add'
                  element={<ProtectedRoute><AddPurchase /></ProtectedRoute>} />
                <Route path='/purchase/list'
                  element={<ProtectedRoute><ListPurchase /></ProtectedRoute>} />
                <Route path='/category/add'
                  element={<ProtectedRoute><AddCategory /></ProtectedRoute>} />
                <Route path='/category/list'
                  element={<ProtectedRoute><ListCategory /></ProtectedRoute>} />
                <Route path='/product/add'
                  element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
                <Route path='/product/list'
                  element={<ProtectedRoute><ListProduct /></ProtectedRoute>} />
                <Route path='/user/add'
                  element={<ProtectedRoute><AddUser /></ProtectedRoute>} />
                <Route path='/user/list'
                  element={<ProtectedRoute><ListUser /></ProtectedRoute>} />
                <Route path='/customer/add'
                  element={<ProtectedRoute><AddCustomer /></ProtectedRoute>} />
                <Route path='/customer/list'
                  element={<ProtectedRoute><ListCustomer /></ProtectedRoute>} />
                <Route path='/sales/add'
                  element={<ProtectedRoute><AddSales /></ProtectedRoute>} />
                <Route path='/sales/list'
                  element={<ProtectedRoute><ListSales /></ProtectedRoute>} />
                <Route path='/stock/:id'
                  element={<ProtectedRoute><ListStock /></ProtectedRoute>} />
                <Route path='/stock/update'
                  element={<ProtectedRoute><UpdateStock /></ProtectedRoute>} />
                <Route path='/logout'
                  element={<ProtectedRoute><Logout /></ProtectedRoute>} />
              </Routes>
            </div>
          </div>
        </MyContext.Provider>
      )}
    </>
  )
}

export default App
export { MyContext }