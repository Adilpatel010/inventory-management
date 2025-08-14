import React, { useContext } from 'react'
import { NavLink } from 'react-router'
import { useState } from 'react';

import { TbLayoutGrid } from "react-icons/tb";
import { LuWarehouse } from "react-icons/lu";
import { BsCart3 } from "react-icons/bs";
import { LuUsers } from "react-icons/lu";
import { LuUser } from "react-icons/lu";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineCategory } from "react-icons/md";
import { MdFormatListBulleted } from "react-icons/md";
import { PiPackage } from "react-icons/pi";
import { LuPackage2 } from "react-icons/lu";
import { RiAlignItemBottomLine } from "react-icons/ri";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { TbLogout } from "react-icons/tb";

const Sidebar = () => {

    const [isWareOpen, setIsWareOpen] = useState(false);
    const [isSupplierOpen, setIsSupplierOpen] = useState(false);
    const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isProductOpen, setIsProductOpen] = useState(false);
    const [isUserOpen, setIsUserOpen] = useState(false);
    const [isSalesOpen, setIsSalesOpen] = useState(false)
    const [iscustomerOpen, setIsCustomerOpen] = useState(false)

    const toggleWare = () => setIsWareOpen(!isWareOpen);
    const toggleSupplier = () => setIsSupplierOpen(!isSupplierOpen);
    const togglePurchase = () => setIsPurchaseOpen(!isPurchaseOpen);
    const toggleCategory = () => setIsCategoryOpen(!isCategoryOpen);
    const toggleProduct = () => setIsProductOpen(!isProductOpen);
    const toggleUser = () => setIsUserOpen(!isUserOpen);
    const toggleSales = () => setIsSalesOpen(!isSalesOpen);
    const toggleCustomer = () => setIsCustomerOpen(!iscustomerOpen);

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-2" id='sidebar'>
                        <div className='menu'>
                            <ul>
                                <NavLink to="/dashboard">
                                    <li><TbLayoutGrid className='sidebar-icon' />Dashboard</li></NavLink>
                                <NavLink to="/w">
                                    <li onClick={toggleWare}>
                                        <LuWarehouse className='sidebar-icon' />Warehouse
                                        <span className={`fa-solid ${isWareOpen ? 'fa-angle-up' : 'fa-angle-down'}`}></span>
                                    </li></NavLink>

                                <ul className={`ware-show list-unstyled ${isWareOpen ? 'show' : ''}`}>
                                    <NavLink to="/warehouse/add">
                                        <li className={({ isActive }) => isActive ? 'link active' : 'link'} id='link'>
                                            <IoMdAdd className='sidebar-icon' /> Add Warehouse</li>
                                    </NavLink>

                                    <NavLink to="/warehouse/list">
                                        <li className={({ isActive }) => isActive ? 'link active' : 'link'} id='link'>
                                            <MdFormatListBulleted className='sidebar-icon' /> List Warehouse</li>
                                    </NavLink>
                                </ul>

                                <NavLink to="/s">
                                    <li onClick={toggleSupplier}>
                                        <LuUsers className='sidebar-icon' />Supplier
                                        <span className={`fa-solid ${isSupplierOpen ? 'fa-angle-up' : 'fa-angle-down'}`}></span>
                                    </li>
                                </NavLink>
                                <ul className={`ware-show list-unstyled ${isSupplierOpen ? 'show' : ''}`}>
                                    <NavLink to="/supplier/add">
                                        <li className={({ isActive }) => isActive ? 'link active' : 'link'} id='link'>
                                            <IoMdAdd className='sidebar-icon' /> Add Supplier</li>
                                    </NavLink>

                                    <NavLink to="/supplier/list">
                                        <li className={({ isActive }) => isActive ? 'link active' : 'link'} id='link'>
                                            <MdFormatListBulleted className='sidebar-icon' /> List Supplier</li>
                                    </NavLink>
                                </ul>

                                <NavLink to="/p">
                                    <li onClick={togglePurchase}><BsCart3 className='sidebar-icon' />Purchase
                                        <span className={`fa-solid ${isPurchaseOpen ? 'fa-angle-up' : 'fa-angle-down'}`}></span>
                                    </li></NavLink>
                                <ul className={`ware-show list-unstyled ${isPurchaseOpen ? 'show' : ''}`}>
                                    <NavLink to="/purchase/add">
                                        <li className={({ isActive }) => isActive ? 'link active' : 'link'} id='link'>
                                            <IoMdAdd className='sidebar-icon' />Add Purchase</li>
                                    </NavLink>

                                    <NavLink to="/purchase/list">
                                        <li className={({ isActive }) => isActive ? 'link active' : 'link'} id='link'>
                                            <MdFormatListBulleted className='sidebar-icon' /> List Purchase</li>
                                    </NavLink>
                                </ul>

                                <NavLink to="/c">
                                    <li onClick={toggleCategory}><MdOutlineCategory className='sidebar-icon' />Category
                                        <span className={`fa-solid ${isCategoryOpen ? 'fa-angle-up' : 'fa-angle-down'}`}></span>
                                    </li></NavLink>
                                <ul className={`ware-show list unstyled ${isCategoryOpen ? 'show' : ''}`}>
                                    <NavLink to="/category/add">
                                        <li className={({ isActive }) => isActive ? 'link active' : 'link'} id='link'>
                                            <IoMdAdd className='sidebar-icon' /> Add Category</li>
                                    </NavLink>

                                    <NavLink to="/category/list">
                                        <li className={({ isActive }) => isActive ? 'link active' : 'link'} id='link'>
                                            <MdFormatListBulleted className='sidebar-icon' /> List Category</li>
                                    </NavLink>
                                </ul>
                                <NavLink to="/pr">
                                    <li onClick={toggleProduct}><LuPackage2 className='sidebar-icon' />Product
                                        <span className={`fa-solid ${isProductOpen ? 'fa-angle-up' : 'fa-angle-down'}`}></span>
                                    </li></NavLink>

                                <ul className={`ware-show list unstyled ${isProductOpen ? 'show' : ''}`}>
                                    <NavLink to="/product/add">
                                        <li className={({ isActive }) => isActive ? 'link active' : 'link'} id='link'>
                                            <IoMdAdd className='sidebar-icon' /> Add Product</li>
                                    </NavLink>

                                    <NavLink to="/product/list">
                                        <li className={({ isActive }) => isActive ? 'link active' : 'link'} id='link'>
                                            <MdFormatListBulleted className='sidebar-icon' /> List Product</li>
                                    </NavLink>
                                </ul>

                                <NavLink to="/u">
                                    <li onClick={toggleUser}><LuUser className='sidebar-icon' />User
                                        <span className={`fa-solid ${isUserOpen ? 'fa-angle-up' : 'fa-angle-down'}`}></span>
                                    </li>
                                </NavLink>

                                <ul className={`ware-show list unstyled ${isUserOpen ? 'show' : ''}`}>
                                    <NavLink to="/user/add">
                                        <li className={({ isActive }) => isActive ? 'link-active' : 'link'} id='link' >
                                            <IoMdAdd className='sidebar-icon' /> Add User </li>
                                    </NavLink>

                                    <NavLink to="/user/list">
                                        <li className={({ isActive }) => isActive ? 'link active' : 'link'} id='link'>
                                            <MdFormatListBulleted className='sidebar-icon' /> List User</li>
                                    </NavLink>
                                </ul>

                                <NavLink to="/se">
                                    <li onClick={toggleSales}><PiPackage className='sidebar-icon' />Sales
                                        <span className={`fa-solid ${isSalesOpen ? 'fa-angle-up' : 'fa-angle-down'}`}></span>
                                    </li></NavLink>

                                <ul className={`ware-show list unstyled ${isSalesOpen ? 'show' : ''}`}>
                                    <NavLink to="/ce">
                                        <li onClick={toggleCustomer} className={({ isActive }) => isActive ? 'link-active' : 'link'} id='link'>
                                            <LuUsers className='sidebar-icon' /> Customer
                                            <span className={`fa-solid ${iscustomerOpen ? 'fa-angle-up' : 'fa-angle-down'}`}></span>
                                        </li>
                                    </NavLink>

                                    <ul className={`ware-show list unstyled ${iscustomerOpen ? 'show' : ''}`}>
                                        <NavLink to="/customer/add">
                                            <li className={({ isActive }) => isActive ? 'link-active' : 'link'} id='link' >
                                                <IoMdAdd className='sidebar-icon' /> Add Customer </li>
                                        </NavLink>

                                        <NavLink to="/customer/list">
                                            <li className={({ isActive }) => isActive ? 'link active' : 'link'} id='link'>
                                                <MdFormatListBulleted className='sidebar-icon' /> List Customer</li>
                                        </NavLink>
                                    </ul>

                                    <NavLink to="/sales/order">
                                        <li className={({ isActive }) => isActive ? 'link-active' : 'link'} id='link'>
                                            <MdFormatListBulleted className='sidebar-icon' /> Sales Order </li>
                                    </NavLink>

                                    <NavLink to="/sales/item">
                                        <li className={({ isActive }) => isActive ? 'link-active' : 'link'} id='link'>
                                            <RiAlignItemBottomLine className='sidebar-icon' /> Sales Item </li>
                                    </NavLink>
                                </ul>

                                <NavLink to="/organization">
                                    <li><HiOutlineBuildingOffice2 className='sidebar-icon' />Organization</li></NavLink>
                                <NavLink to="/logout">
                                    <li><TbLogout className='sidebar-icon' />Logout</li></NavLink>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar

