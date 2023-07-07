import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import axios from "axios";
import { Modal, Select } from "antd";
import { Checkbox, Radio } from "antd";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Prices } from "../Components/Prices";

const HomePages = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `http://127.0.0.1:8080/api/v1/category/categories`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (err) {
      console.log(err);
      toast.error("Somethin went wrong in getting category");
    }
  };

  const getProductCount = async () => {
    try {
      const { data } = await axios.get(
        "http://127.0.0.1:8080/api/v1/product/getTotal"
      );
      if (data?.success) {
        setTotal(data?.total);
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://127.0.0.1:8080/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://127.0.0.1:8080/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategories();
    getProductCount();
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  //filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "http://127.0.0.1:8080/api/v1/product/product-filters",
        { checked, radio }
      );
      setProducts(data?.product);
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  return (
    <Layout title={"Shreeji - Home page"}>
      <img
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
        height={"300px"}
        src="./images/banner.jpg"
      />
      <div className="container-fluid row mt-3">
        <div className="">
          <button
            className="btn btn-dark"
            onClick={() => {
              setVisible(true);
            }}
          >
            Product Filter
          </button>
          <Modal
            onCancel={() => setVisible(false)}
            onOk={() => {
              setVisible(false);
            }}
            visible={visible}
          >
            <h5 className="text-center">Filter By Category</h5>
            <div className="d-flex flex-column mb-3">
              {categories.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>

            <div className="d-flex flex-column">
              <h5 className="text-center">Filter By Price</h5>
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="d-flex mt-3 flex-column">
              <button
                className="btn btn-danger"
                onClick={() => window.location.reload()}
              >
                RESET FILTERS
              </button>
            </div>
          </Modal>
        </div>
        {/* <div className="col-md-9"> */}
        <div>
          <h1 className="text-center"> All Products</h1>
          <div className="d-flex container-fluid flex-wrap">
            {products.map((p) => (
              <div className="card m-2" style={{ width: "17rem" }}>
                <img
                  src={`http://127.0.0.1:8080/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  height={"200px"}
                  alt={p.name}
                />
                <div className="border border-dark" />
                <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="card-title">{p.name}</h5>
                    <h6 className="card-text text-decoration-underline">
                      {p.weight ? `${p.weight} gm.` : ""}
                    </h6>
                    <h5 className="card-title card-price">
                      {p.price
                        .toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })
                        .replace(/(\.00)$/, "")}
                    </h5>
                  </div>
                  <p className="card-text">
                    {p.description.substring(0, 60)}...
                  </p>
                  <button
                    class="btn btn-primary ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Detail
                  </button>
                  <button class="btn btn-secondary ms-4">Add to 🛒</button>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "loading..." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePages;
