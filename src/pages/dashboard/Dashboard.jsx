import React from 'react'
import { useState, useEffect } from 'react';
import { getCategoryCount, getProductCount, getUserCount, getWarehouseCount } from '../../api/apifetcher';
import { LuWarehouse } from "react-icons/lu";
import { LuPackage2 } from "react-icons/lu";
import { FaChartLine } from "react-icons/fa";
import { LuUser } from "react-icons/lu";
import { IoStarHalfSharp } from "react-icons/io5";
import { MdOutlineCategory } from "react-icons/md";
import { Chart } from "react-google-charts";

// column chart
export const datas = [
  ["Month", "Sales", "Expenses", "Profit"],
  ["Jan", 1000, 400, 200],
  ["Feb", 1170, 460, 250],
  ["Mar", 660, 1120, 300],
  ["Apr", 1030, 540, 350],
];

export const optionss = {
  chart: {
    title: "Company Sales Report",
    subtitle: "Sales, Expenses, and Profit: Jan–Apr",
  },
  colors: ["#4f46e5", "#f87171", "#22c55e"],
  legend: { position: "bottom" },
};

// second pei chart
export const data = [
  ["Category", "Sales"],
  ["Electronics", 500],
  ["Furniture", 300],
  ["Clothing", 200],
  ["Books", 150],
  ["Other", 100],
];

export const options = {
  title: "Sales by Category",
  pieHole: 0.4, // Set 0 for normal pie, or e.g. 0.4 for donut
  is3D: false,
  colors: ["#6366f1", "#facc15", "#34d399", "#f87171", "#60a5fa"],
  legend: { position: "right", textStyle: { fontSize: 14 } },
  chartArea: { width: "90%", height: "75%" },
};


const Dashboard = () => {

  const [warehouseCount, setWarehouseCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0)
  const [category, setCategory] = useState(0);

  // count warehouse
  const fetchWarehouse = async () => {
    try {
      const res = await getWarehouseCount();
      setWarehouseCount(res.data);
    } catch (err) {
      console.log("Error fetching warehouse count:", err);
    }
  };

  // count product
  const fetchProduct = async () => {
    try {
      const res = await getProductCount()
      setProductCount(res.data)
    }
    catch (err) {
      console.log("Error", err)
    }
  }

  // count user
  const fetchUser = async () => {
    try {
      const res = await getUserCount()
      setUserCount(res.data)
    } catch (err) {
      console.log("Error", err)
    }
  }

  // count category
  const fetchCategory = async () => {
    try {
      const res = await getCategoryCount()
      setCategory(res.data)
    } catch (err) {
      console.log("Error", err)
    }
  }
  useEffect(() => {
    fetchWarehouse();
    fetchProduct();
    fetchUser()
    fetchCategory()
  }, []);

  return (
    <div className="container-fluid pb-5 font" id='dashboard-main'>
      <div className='pt-3 pb-3'>
        <h3 className='bg-white rounded p-3 ps-3'>Dashboard</h3>
      </div>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="dashboard-box text-white" style={{ height: "170px" }} id='warehouse-part'>
            <h6>Total Warehouse</h6>
            <h2>{warehouseCount}</h2>
            <p> <span> +95% </span>Last Month</p>
            <LuWarehouse className='warehouse-icon' />
          </div>
        </div>
        <div className="col-md-4">
          <div className="dashboard-box bg-success text-white" style={{ height: "170px" }} id='product-part'>
            <h6>Total Products</h6>
            <h2>{productCount}</h2>
            <p> <span> +30% </span>Last Month</p>
            <LuPackage2 className='product-icon' />
          </div>
        </div>
        <div className="col-md-4">
          <div className="dashboard-box text-white" style={{ height: "170px" }} id='sales-part'>
            <h6>Total Sales</h6>
            <h2>$250000</h2>
            <p> <span> +30% </span>Last Month</p>
            <FaChartLine className='sales-icon' />
          </div>
        </div>
        <div className="col-md-4">
          <div className="dashboard-box text-white" style={{ height: "170px" }} id='user-part'>
            <h6>Total Users</h6>
            <h2>{userCount}</h2>
            <p> <span> +25% </span>Last Month</p>
            <LuUser className='user-icon' />
          </div>
        </div>
        <div className="col-md-4">
          <div className="dashboard-box text-white" style={{ height: "170px" }} id='review-part'>
            <h6>Total Reviews</h6>
            <h2>25</h2>
            <p> <span> +45% </span>Last Month</p>
            <IoStarHalfSharp className='review-icon' />
          </div>
        </div>
        <div className="col-md-4">
          <div className="dashboard-box text-white" style={{ height: "170px" }} id='category-part'>
            <h6>Total Category</h6>
            <h2>{category}</h2>
            <p> <span> +30% </span>Last Month</p>
            <MdOutlineCategory className='category-icon' />
          </div>
        </div>
      </div>

      <div className='row mt-4'>
        <div className="col-md-8">
          <Chart
            chartType="ColumnChart"
            width="100%"
            height="400px"
            data={datas}
            options={optionss}
          />
        </div>
        <div className="col-md-4">
          <Chart
            chartType="PieChart"
            width="100%"
            height="400px"
            data={data}
            options={options}
          />
        </div>
      </div>


      {/* container-fluid end */}
    </div>

  )
}

export default Dashboard







{/* <div className='container-fluid'>
  <div className='row mt-5'>
    <div className="col-md-8">
      <div className='row g-4'>
        <div className="col-md-6"><p className='bg-success rounded' style={{ height: "170px" }}>hello</p></div>
        <div className="col-md-6"><p className='bg-primary rounded' style={{ height: "170px" }} >hello</p></div>
        <div className="col-md-6"><p className='bg-success rounded' style={{ height: "170px" }}>hello</p></div>
      </div>

    </div>
    <div className="col-md-4 bg-danger">
      <p>hello</p>
    </div>
  </div>
</div> */}