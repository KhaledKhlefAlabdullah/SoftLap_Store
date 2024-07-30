// src/components/AddProductForm.js

import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // تأكد من أنك تستورد Bootstrap

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    category_id: "",
    company_id: "",
    name: "",
    description: "",
    quantity: "",
    price: "",
    image: null,
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
      setImagePreview(URL.createObjectURL(files[0])); // معاينة الصورة
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // إنشاء كائن FormData
    const data = new FormData();
    data.append("category_id", formData.category_id);
    data.append("company_id", formData.company_id);
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("quantity", formData.quantity);
    data.append("price", formData.price);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/products/add",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

    //   const res = await axios.post('http://127.0.0.1:8080/predict',{'number':1,'name':2,'rating':3});
    //   alert(res);
      setResponseMessage(
        `Product added successfully! Response: ${JSON.stringify(response.data)}`
      );
      console.log(response.data);
      setFormData({
        category_id: "",
        company_id: "",
        name: "",
        description: "",
        quantity: "",
        price: "",
        image: null,
      });
      setImagePreview(null); // إخفاء معاينة الصورة بعد الإضافة
    } catch (error) {
      console.error(
        "There was an error adding the product!",
        error.response?.data || error.message
      );
      setResponseMessage(
        `Error adding product: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="category_id">Category ID:</label>
              <input
                type="number"
                id="category_id"
                name="category_id"
                className="form-control"
                value={formData.category_id}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="company_id">Company ID:</label>
              <input
                type="number"
                id="company_id"
                name="company_id"
                className="form-control"
                value={formData.company_id}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                className="form-control"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                step="0.01"
                id="price"
                name="price"
                className="form-control"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label htmlFor="image">Image:</label>
              <input
                type="file"
                id="image"
                name="image"
                className="form-control-file"
                accept="image/*"
                onChange={handleChange}
              />
              {imagePreview && (
                <div className="mt-2">
                  <img
                    src={imagePreview}
                    alt="Image Preview"
                    className="img-fluid"
                    style={{ maxHeight: "200px", objectFit: "cover" }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-success" style={{width:'100%',marginTop:'15px',backgroundColor:"red"}}>
            Add Product
          </button>
        </div>
      </form>
      {responseMessage && (
        <div className="alert alert-info mt-4">{responseMessage}</div>
      )}
    </div>
  );
};

export default AddProductForm;
