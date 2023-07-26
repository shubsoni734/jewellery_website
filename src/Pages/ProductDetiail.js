import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../Context/Cart";
import toast from "react-hot-toast";

const ProductDetiail = () => {
  const params = useParams();
  const [cart, setCart] = useCart();

  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        `http://127.0.0.1:8080/api/v1/product/getSingle-product/${params.slug}`
      );
      if (data?.success) {
        setProduct(data?.products);
        relatedProductFun(data?.products.category._id, data?.products?._id);
      }
      console.log(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const relatedProductFun = async (cid, pid) => {
    try {
      const { data } = await axios.get(
        `http://127.0.0.1:8080/api/v1/product/related-product/${cid}/${pid}`
      );
      setRelatedProduct(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (params?.slug) getProducts();
  }, [params?.slug]);
  return (
    <Layout title={"products Detail"}>
      <div className="row container product-details mt-2">
        <div className="col-md-6">
          <img
            src={`http://127.0.0.1:8080/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="300"
            width={"350px"}
          />
        </div>
        <div className="col-md-6 product-details-info ">
          <h1 className="text-center">Product Details</h1>
          <hr />
          <h6>Name : {product.name}</h6>
          <h6>description : {product.description}</h6>
          <h6>
            Price :{" "}
            {product?.price?.toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
            })}
          </h6>
          <h6>Category : {product?.category?.name}</h6>
          <button
            class="btn btn-secondary ms-1"
            onClick={() => {
              setCart([...cart, product]);
              localStorage.setItem("cart", JSON.stringify([...cart, product]));
              toast.success("Item Added to cart");
            }}
          >
            ADD TO CART
          </button>
        </div>
      </div>
      <hr />
      <div className="row container similar-products ">
        <h4>Similar Products ➡️</h4>
        {relatedProduct.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProduct.map((p) => (
            <div className="card m-2" key={p._id}>
              <img
                src={`http://127.0.0.1:8080/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
                height="100px"
                width={"100px"}
              />
              <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{p.name}</h5>
                  <h5 className="card-title card-price">
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </h5>
                </div>
                <p className="card-text ">
                  {p.description.substring(0, 60)}...
                </p>
                <div className="card-name-price">
                  <button
                    className="btn btn-info ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button
                    className="btn btn-dark ms-1"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item Added to cart");
                    }}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetiail;
