import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import { useAuth } from "../Context/Auth";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const HomePages = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState();
  // const [page, setPage] = useState(1);
  // const [loading, setLoading] = useState(false);

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

  const getProducts = async () => {
    const { data } = await axios.get(
      "http://127.0.0.1:8080/api/v1/product/get-product"
    );
    setProducts(data.products);
  };
  useEffect(() => {
    getAllCategories();
    getProductCount();
    getProducts();
    // if (page === 1) {
    //   // loadMore();
    // }
  }, []);

  return (
    <Layout title={"Shreeji - Home page"}>
      <img
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
        height={"300px"}
        src="/images/banner.jpg"
      />
      <div className="row">
        <div className="col-md-3">
          <h4 className="text-center">Filter By Category</h4>
        </div>
        <div className="col-md-9">
          <h1 className="text-center"> All Products</h1>
          <div className="d-flex flex-wrap">
            <h1>Products</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePages;
