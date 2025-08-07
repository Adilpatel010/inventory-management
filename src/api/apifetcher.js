import axios from "axios";
// Save token (run this once somewhere before calling APIs)
// localStorage.setItem("token", "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI4NTExNjczNDYxIiwiaWF0IjoxNzUzODY4MTg4LCJleHAiOjE3NTM4NzE3ODh9.LQ6fp91IJfuIPRXmN3dbbbVfPW_lqAhA6HrcGg07MEc");

const api = axios.create({
    baseURL: "http://192.168.0.167:8080/api/v1",
})

// Add JWT token to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// --------------->> warehouse all api <<---------------

// get warehouse
export const getWarehouseData = () => {
    return api.get("/WareHouse");
}

// post warehouse
export const addWarehouseData = (data) => {
    return api.post("/WareHouse/register", data)
}

// status change warehouse
export const updateWarehouseStatus = (id, status) => {
    return api.patch(`/WareHouse/${id}/${status == "ACTIVE" ? "INACTIVE" : "ACTIVE"}`)
}

// delete warehouse
export const deleteWarehouseData = (id) => {
    return api.delete(`/WareHouse/${id}`)
}

// update warehouse
export const updateWarehouseData = (id, data) => {
    return api.put(`/WareHouse/${id}`, data)
}

// search warehouse
export const searchWarehouseData = (search) => {
    return api.get(`/WareHouse/wareHouse?search=${search}`);
};

// count warehouse
export const getWarehouseCount = () => {
    return api.get("/WareHouse/count")
}

// get warehouse by ID
export const getWarehouseId = (id) => {
    return api.get(`/WareHouse/${id}`)
}

// --------------->> supplier all api <<---------------

// get supplier
export const getSupplierData = () => {
    return api.get("/supplier")
}

// change status supplier
export const updateSupplierStatus = (id, status) => {
    return api.patch(`/supplier/${id}/${status == "ACTIVE" ? "INACTIVE" : "ACTIVE"}`)
}

// post supplier
export const addSupplierData = (data) => {
    return api.post("/supplier/add", data)
}

// delete supplier
export const deleteSupplierData = (id) => {
    return api.delete(`/supplier/${id}`)
}

// update supplier
export const updateSupplierData = (id, data) => {
    return api.put(`supplier/${id}`, data)
}

// search supplier
export const searchSupplierData = (search) => {
    return api.get(`/supplier/suppliers?search=${search}`)
}

// get supplier by id
export const getSupplierId = (id) => {
    return api.get(`/supplier/${id}`)
}

// --------------->> purchase all api <<---------------

// get purchase
export const getPurchaseData = () => {
    return api.get("/purchase")
}

// post purchase
export const addPurchaseData = (data) => {
    return api.post("/purchase/add", data)
}

// update purchase
export const updatePurchaseData = (id, data) => {
    return api.put(`/purchase/${id}`, data)
}

// delete purchase
export const deletePurchaseData = (id) => {
    return api.delete(`/purchase/${id}`)
}

// change status purchase 
export const updatePurchaseStatus = (id, status) => {
    return api.patch(`/purchase/${id}/${status == "ACTIVE" ? "INACTIVE" : "ACTIVE"}`)
}

// get purchase by id
export const getPurchaseId = (id) => {
    return api.get(`/purchase/${id}`)
}

// ---------------->> Category all api <<-----------------

// get category 
export const getCategoryData = () => {
    return api.get("/category")
}

// post category
export const addCategoryData = (data) => {
    return api.post("/category", data)
}

// update category
export const updateCategoryData = (id, data) => {
    return api.put(`/category/${id}`, data)
}

// change status category 
export const updateCategoryStatus = (id, status) => {
    return api.patch(`/category/${id}/${status == "ACTIVE" ? "INACTIVE" : "ACTIVE"}`)
}

// delete category
export const deleteCategoryData = (id) => {
    return api.delete(`/category/${id}`)
}

// get category by id
export const getCategoryId = (id) => {
    return api.get(`/category/${id}`)
}

// search supplier
export const searchCategoryData = (search) => {
    return api.get(`category/categories?search=${search}`)
}

// count category
export const getCategoryCount = () => {
    return api.get('category/count')
}

// ----------------->> Product all api <<--------------

// get product
export const getProductData = () => {
    return api.get('/product')
}

// delete product
export const deleteProductData = (id) => {
    return api.delete(`/product/${id}`)
}

// post product
export const addProductData = (data) => {
    return api.post("/product/add", data)
}

// update product
export const updateProductData = (id, data) => {
    return api.put(`/product/${id}`, data)
}

// change status
export const updateProductStatus = (id, status) => {
    return api.patch(`/product/${id}/${status == "ACTIVE" ? "INACTIVE" : "ACTIVE"}`)
}

// get product by id
export const getProductId = (id) => {
    return api.get(`/product/${id}`)
}

// search product
export const searchProductData = (search) => {
    return api.get(`/product/products?search=${search}`)
}

// count product
export const getProductCount = () => {
    return api.get("/product/count")
}

// ----------------->> User all api <<--------------

// count user
export const getUserCount = () => {
    return api.get("/user/count")
}

// get user
export const getUserData = () => {
    return api.get("/user")
}

// create user 
export const registerUser = (data) => {
    return api.post("/auth/register", data)
}

// update status 
export const updateUserStatus = (id, status) => {
    return api.patch(`/user/${id}/${status == "ACTIVE" ? "INACTIVE" : "ACTIVE"}`)
}

// update userdata
export const updateUserData = (id, data) => {
    return api.put(`/user/${id}`, data)
}

// get userId
export const getUserId = (id) => {
    return api.get(`/user/${id}`)
}

// delete user 
export const deleteUserData = (id) => {
    return api.delete(`/user/${id}`)
}

// search user 
export const searchUserData = (search) => {
    return api.get(`/user/searchUser?search=${search}`)
}

// login and register api
export const loginUser = (data) => {
    return api.post("/auth/login", data);
};

// ----------------->> Sales all api <<--------------

// ----------------->> Sales/customer all api <<--------------

// get customer
export const getCustomerData=()=>{
    return api.get("/Customer")
}