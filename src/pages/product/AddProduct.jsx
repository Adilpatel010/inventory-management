import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router";
import { addProductData, updateProductData } from "../../api/apifetcher";
import { IoMdAdd } from "react-icons/io";

const AddProduct = () => {
    const { state } = useLocation();
    const [updateData, setUpdateData] = useState(false);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        referenceProductId: null,
        organizationId: "",
        categoryId: "",
        supplierId: "",
        productName: "",
        productCode: "",
        productImage: "",
        stock: "",
        lowStock: "",
        description: "",
        price: "",
        warehouses: [{ wareHouseId: "", quantity: "" }],
    });

    // normal inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // handle warehouse input change
    const handleWarehouseChange = (index, e) => {
        const { name, value } = e.target;
        const updatedWarehouses = [...formData.warehouses];
        updatedWarehouses[index][name] = value;
        setFormData({ ...formData, warehouses: updatedWarehouses });
    };

    // add new warehouse row
    const handleAddWarehouse = () => {
        setFormData((prev) => ({
            ...prev,
            warehouses: [...(prev.warehouses || []), { wareHouseId: "", quantity: "" }],
        }));
    };

    // validation
    const validate = () => {
        const newErrors = {};
        if (!String(formData.organizationId).trim()) {
            newErrors.organizationId = "Organization ID is required";
        }
        if (!String(formData.categoryId).trim()) {
            newErrors.categoryId = "Category ID is required";
        }
        if (!String(formData.supplierId).trim()) {
            newErrors.supplierId = "Supplier ID is required";
        }
        if (!String(formData.productName).trim()) {
            newErrors.productName = "Product Name is required";
        }
        if (!String(formData.productCode).trim()) {
            newErrors.productCode = "Product Code is required";
        }
        if (!String(formData.productImage).trim()) {
            newErrors.productImage = "Product Image is required";
        }
        if (!String(formData.stock).trim()) {
            newErrors.stock = "Stock is required";
        }
        if (!String(formData.description).trim()) {
            newErrors.description = "Description is required";
        }
        if (!String(formData.price).trim()) {
            newErrors.price = "Price is required";
        }

        (formData.warehouses || []).forEach((wh, idx) => {
            if (!String(wh.wareHouseId).trim()) {
                newErrors[`wareHouseId_${idx}`] = "Warehouse ID is required";
            }
            if (!String(wh.quantity).trim()) {
                newErrors[`quantity_${idx}`] = "Quantity is required";
            }
        });
        return newErrors;
    };

    // submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const payload = {
            ...formData,
            stocks: formData.warehouses?.map((wh) => ({
                wareHouseId: wh.wareHouseId,
                quantity: wh.quantity,
            })) || [],
        };

        console.log("Final Payload Sent:", payload);

        try {
            if (updateData) {
                await updateProductData(formData.productId, payload);
                alert("Data updated successfully");
                navigate("/product/list");
            } else {
                await addProductData(payload);
                alert("Data added successfully");
                navigate("/product/list");
            }

            // reset form
            setFormData({
                referenceProductId: null,
                organizationId: "",
                categoryId: "",
                supplierId: "",
                productName: "",
                productCode: "",
                productImage: "",
                stock: "",
                lowStock: "",
                description: "",
                price: "",
                warehouses: [{ wareHouseId: "", quantity: "" }],
            });
            setErrors({});
            setUpdateData(false);
        } catch (err) {
            console.error("Error adding product:", err);
            alert("Something went wrong");
        }
    };

    // data navigate
    useEffect(() => {
        if (state) {
            setUpdateData(true);
            setFormData({
                ...state,
                warehouses:
                    state.warehouses && state.warehouses.length > 0
                        ? state.warehouses
                        : [{ wareHouseId: "", quantity: "" }],
            });
        }
    }, [state]);

    return (
        <div>
            <div className="container-fluid pb-5">
                <div className="row justify-content-center mt-2">
                    <div className="col-lg-11 col-11 mt-4 p-4 bg-white rounded" id="form">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                {/* normal inputs */}
                                <div className="col-md-6 col-12">
                                    <label className="form-label">Reference Product ID</label>
                                    <input
                                        type="text"
                                        className="form-control shadow-none border-2"
                                        name="referenceProductId"
                                        value={formData.referenceProductId || ""}
                                        onChange={handleChange}
                                        placeholder="Reference Product ID"
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Organization ID</label>
                                    <input
                                        type="text"
                                        className="form-control shadow-none border-2"
                                        name="organizationId"
                                        value={formData.organizationId}
                                        onChange={handleChange}
                                        placeholder="Organization ID"
                                    />
                                    {errors.organizationId && (
                                        <small className="text-danger">{errors.organizationId}</small>
                                    )}
                                </div>

                                <div className="col-md-6 mt-3">
                                    <label className="form-label">Category ID</label>
                                    <input
                                        type="text"
                                        className="form-control shadow-none border-2"
                                        name="categoryId"
                                        value={formData.categoryId}
                                        onChange={handleChange}
                                        placeholder="Category ID"
                                    />
                                    {errors.categoryId && (
                                        <small className="text-danger">{errors.categoryId}</small>
                                    )}
                                </div>

                                <div className="col-md-6 mt-3">
                                    <label className="form-label">Supplier ID</label>
                                    <input
                                        type="text"
                                        className="form-control shadow-none border-2"
                                        name="supplierId"
                                        value={formData.supplierId}
                                        onChange={handleChange}
                                        placeholder="Supplier ID"
                                    />
                                    {errors.supplierId && (
                                        <small className="text-danger">{errors.supplierId}</small>
                                    )}
                                </div>

                                <div className="col-md-6 mt-3">
                                    <label className="form-label">Product Name</label>
                                    <input
                                        type="text"
                                        className="form-control shadow-none border-2"
                                        name="productName"
                                        value={formData.productName}
                                        onChange={handleChange}
                                        placeholder="Product Name"
                                    />
                                    {errors.productName && (
                                        <small className="text-danger">{errors.productName}</small>
                                    )}
                                </div>

                                <div className="col-md-6 mt-3">
                                    <label className="form-label">Product Code</label>
                                    <input
                                        type="text"
                                        className="form-control shadow-none border-2"
                                        name="productCode"
                                        value={formData.productCode}
                                        onChange={handleChange}
                                        placeholder="Product Code"
                                    />
                                    {errors.productCode && (
                                        <small className="text-danger">{errors.productCode}</small>
                                    )}
                                </div>

                                <div className="col-md-6 mt-3">
                                    <label className="form-label">Product Image</label>
                                    <input
                                        type="text"
                                        className="form-control shadow-none border-2"
                                        name="productImage"
                                        value={formData.productImage}
                                        onChange={handleChange}
                                        placeholder="Product Image"
                                    />
                                    {errors.productImage && (
                                        <small className="text-danger">{errors.productImage}</small>
                                    )}
                                </div>

                                <div className="col-md-6 mt-3">
                                    <label className="form-label">Description</label>
                                    <textarea
                                        className="form-control shadow-none border-2"
                                        name="description"
                                        rows="1"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Description"
                                    />
                                    {errors.description && (
                                        <small className="text-danger">{errors.description}</small>
                                    )}
                                </div>

                                <div className="col-md-6 mt-3">
                                    <label className="form-label">Stock</label>
                                    <input
                                        type="text"
                                        className="form-control shadow-none border-2"
                                        name="stock"
                                        value={formData.stock}
                                        onChange={handleChange}
                                        placeholder="Stock"
                                    />
                                    {errors.stock && (
                                        <small className="text-danger">{errors.stock}</small>
                                    )}
                                </div>

                                <div className="col-md-6 mt-3">
                                    <label className="form-label">Low Stock</label>
                                    <input
                                        type="text"
                                        className="form-control shadow-none border-2"
                                        name="lowStock"
                                        value={formData.lowStock}
                                        onChange={handleChange}
                                        placeholder="Low Stock"
                                    />
                                </div>

                                <div className="col-md-6 mt-3">
                                    <label className="form-label">Price</label>
                                    <input
                                        type="text"
                                        className="form-control shadow-none border-2"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        placeholder="Price"
                                    />
                                    {errors.price && (
                                        <small className="text-danger">{errors.price}</small>
                                    )}
                                </div>

                                {/* dynamic warehouse fields */}
                                <h5 className="mt-4">Warehouse & Quantity</h5>
                                {(formData.warehouses || []).map((wh, index) => (
                                    <div className="row" key={index}>
                                        <div className="col-md-5 mt-3">
                                            <label className="form-label">Warehouse ID</label>
                                            <input
                                                type="text"
                                                className="form-control shadow-none border-2"
                                                name="wareHouseId"
                                                value={wh.wareHouseId}
                                                onChange={(e) => handleWarehouseChange(index, e)}
                                                placeholder="Warehouse ID"
                                            />
                                            {errors[`wareHouseId_${index}`] && (
                                                <small className="text-danger">
                                                    {errors[`wareHouseId_${index}`]}
                                                </small>
                                            )}
                                        </div>

                                        <div className="col-md-5 mt-3">
                                            <label className="form-label">Quantity</label>
                                            <input
                                                type="text"
                                                className="form-control shadow-none border-2"
                                                name="quantity"
                                                value={wh.quantity}
                                                onChange={(e) => handleWarehouseChange(index, e)}
                                                placeholder="Quantity"
                                            />
                                            {errors[`quantity_${index}`] && (
                                                <small className="text-danger">
                                                    {errors[`quantity_${index}`]}
                                                </small>
                                            )}
                                        </div>

                                        {/* plus icon on last row only */}
                                        {index === formData.warehouses.length - 1 && (
                                            <div className="col-md-2 mt-5">
                                                <IoMdAdd
                                                    onClick={handleAddWarehouse}
                                                    className="add-icon"
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="d-flex gap-3 mt-5">
                                <button className="btn-form" type="submit">
                                    {updateData ? "Update Product" : "Add Product"}
                                </button>
                                <NavLink to="/product/list">
                                    <button className="btn-form" type="button">
                                        List Product
                                    </button>
                                </NavLink>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
