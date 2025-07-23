import './assets/css/main.css'
import './assets/css/dashboard.css'
import './assets/css/warehouse.css'
import './assets/css/supplier.css'
import './assets/css/purchase.css'
import './assets/css/category.css'
import './assets/css/product.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/dashboard/Dashboard'
import { Routes, Route } from 'react-router'
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

function App() {

  return (
    <>
      <Header />
      <div className='d-flex'>
        <Sidebar />
        <div style={{ height: "90vh", overflowY: "scroll", width: "100%" }}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/warehouse/add" element={<AddWarehouse />} />
            <Route path='/warehouse/list' element={<ListWarehouse />} />
            <Route path='/supplier/add' element={<AddSupplier />} />
            <Route path='/supplier/list' element={<ListSupplier />} />
            <Route path='/purchase/add' element={<AddPurchase />} />
            <Route path='/purchase/list' element={<ListPurchase />} />
            <Route path='/category/add' element={<AddCategory />} />
            <Route path='/category/list' element={<ListCategory />} />
            <Route path='/product/add' element={<AddProduct />} />
            <Route path='/product/list' element={<ListProduct />} />

          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
