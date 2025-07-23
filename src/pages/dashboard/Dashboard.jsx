import React from 'react'
import { useState, useEffect } from 'react';
import { getWarehouseCount } from '../../api/apifetcher';

const Dashboard = () => {

  const [warehouseCount, setWarehouseCount] = useState(0);

  const fetchCount = async () => {
    try {
      const res = await getWarehouseCount();
      setWarehouseCount(res.data);
    } catch (err) {
      console.log("Error fetching warehouse count:", err);
    }
  };

  useEffect(() => {
    fetchCount();
  }, []);

  return (
    <div className="container-fluid pb-5 font" style={{ backgroundColor: 'rgba(228, 239, 250, 0.916)' }}>
      <h2 className='pt-2'>Dashboard</h2>
      <p>This is a Dashboard page</p>

      <div className="row g-4"> {/* g-4 adds gap between columns */}
        <div className="col-md-3">
          <div className="dashboard-box bg-primary text-white rounded">
            <h5>Total Warehouse</h5>
            <h3>{warehouseCount}</h3>
          </div>
        </div>
        <div className="col-md-3">
          <div className="dashboard-box bg-success text-white rounded">
            <h5>Total Product</h5>
            <p>5</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="dashboard-box bg-danger text-white rounded">
            <h5>Total Users</h5>
            <p>25</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="dashboard-box bg-secondary text-white rounded">
            <h5>Total Stock</h5>
            <p>430 Units</p>
          </div>
        </div>

        <div className="col-md-3 mt-5">
          <div className="dashboard-box bg-primary text-white rounded">
            <h5>Total Warehouse</h5>
            <h3>{warehouseCount}</h3>
          </div>
        </div>
        <div className="col-md-3 mt-5">
          <div className="dashboard-box bg-success text-white rounded">
            <h5>Total Products</h5>
            <p>5</p>
          </div>
        </div>
        <div className="col-md-3 mt-5">
          <div className="dashboard-box bg-danger text-white rounded">
            <h5>Total Users</h5>
            <p>25</p>
          </div>
        </div>
        <div className="col-md-3 mt-5">
          <div className="dashboard-box bg-secondary text-white rounded">
            <h5>Total Stock</h5>
            <p>430 Units</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
