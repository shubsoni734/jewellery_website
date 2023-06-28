import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Modal, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

const UpdateProduct = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [id, setId] = useState("");
  const [photo, setPhoto] = useState("");
  const [weight, setWeight] = useState("");

  const getSingleProduct = async () => {
    try {
      let slug = params.slug;
      const { data } = await axios.get(
        `http://127.0.0.1:8080/api/v1/product/getSingle-product/${slug}`
      );
      setId(data.products._id);
      setName(data.products.name);
      setDescription(data.products.description);
      setPrice(data.products.price);
      setQuantity(data.products.quantity);
      setShipping(data.products.shipping);
      setWeight(data.products.weight);
      setCategory(data.products.category._id);
    } catch (error) {
      toast.error("Somethin Went Wrong");
    }
  };

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://127.0.0.1:8080/api/v1/category/categories"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (err) {
      console.log(err);
      toast.error("Somethin went wrong in getting category");
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("weight", weight);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const { data } = await axios.put(
        `http://127.0.0.1:8080/api/v1/product/update-product/${id}`,
        productData
      );
      if (data.success) {
        toast.success("Product Updated Successfully");
        navigate("/dashbord/admin/products");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something Went Wrong1");
    }
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `http://127.0.0.1:8080/api/v1/product/delete-product/${id}`
      );
      if (data?.success) {
        toast.success(`${data.message}`);
        setVisible(false);
        navigate("/dashbord/admin/products");
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getAllCategories();
    getSingleProduct();
  }, []);

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="mb-3 w-75">
              <label className="btn btn-outline-secondary col-md-12">
                {photo ? photo.name : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => {
                    setPhoto(e.target.files[0]);
                  }}
                  hidden
                />
              </label>
            </div>
            <div className="mb-3 w-75">
              {photo ? (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              ) : (
                <div className="text-center">
                  <img
                    src={`http://127.0.0.1:8080/api/v1/product/product-photo/${id}`}
                    alt="product_photo"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              )}
            </div>
            <div className="mb-3 w-75">
              <input
                type="text"
                placeholder="Enter Product Name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                value={weight}
                placeholder="Weight of Item"
                className="form-control"
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div className="mb-3 w-75">
              <textarea
                type="text"
                placeholder="Write a Description"
                value={description}
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-3 w-75">
              <input
                placeholder="Price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="mb-3 w-75">
              <input
                placeholder="Quantity"
                value={quantity}
                type="number"
                className="form-control"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="md-3 w-75">
              <Select
                bordered={false}
                size="larg"
                showSearch
                className="form-control mb-3"
                onChange={(e) => setShipping(e)}
                value={shipping ? "yes" : "No"}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </div>
            <div className="mb-3 w-75">
              <button
                className="btn btn-primary form-control"
                onClick={handleUpdate}
              >
                UPDATE PRODUCT
              </button>
            </div>
            <div className="mb-3 w-75">
              <button
                className="btn btn-danger form-control "
                onClick={() => {
                  setVisible(true);
                }}
              >
                DELETE PRODUCT
              </button>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              onOk={() => {
                setVisible(false);
                handleDelete();
              }}
              visible={visible}
            >
              Are you Sure want to delete this product ?
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;

// <button onClick={setVisible(true)}>
//                 <Modal
//                   onCancel={() => setVisible(false)}
//                   footer={null}
//                   visible={visible}
//                 >
//                   <button
//                     className="btn btn-danger form-control "
//                     // onClick={}
//                     onClick={() => {
//                       handleDelete();
//                       setVisible(false);
//                     }}
//                   >
//                     Ok
//                   </button>
//                   <button>Cancel</button>
//                 </Modal>
//               </button>
