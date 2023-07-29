import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "../../Styles/NavBarstyle.css";
import { BiSearchAlt } from "react-icons/bi";
import { useAuth } from "../../Context/Auth";
import toast from "react-hot-toast";
import Searchinput from "../Form/Searchinput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../Context/Cart";
import { Badge } from "antd";
import axios from "axios";

// import { Modal, ModalBody, ModalHeader } from "reactstrap";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const categories = useCategory([]);
  const [searchBtn, setSerchBtn] = useState(false);
  const [silverValue, setSilverValue] = useState(null);
  const [goldValue, setGoldValue] = useState(null);
  // const [modal1, setModal1] = useState(false);

  // var myHeaders = new Headers();
  // myHeaders.append("x-access-token", "goldapi-hpzrlkjsq0gs-io");
  // myHeaders.append("Content-Type", "application/json");

  // var requestOptions = {
  //   method: "GET",
  //   headers: myHeaders,
  //   redirect: "follow",
  // };
  useEffect(async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8080/api/v1/auth/getRate"
      );
      const { silver, gold } = response.data.rate[0];
      setSilverValue(silver);
      setGoldValue(gold);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);
  // setInterval(async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://127.0.0.1:8080/api/v1/auth/getRate"
  //     );
  //     const { silver, gold } = response.data.rate[0];
  //     setSilverValue(silver);
  //     setGoldValue(gold);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // }, 2000);

  // useEffect(async () => {
  //   const res = await axios.get(
  //     "https://www.goldapi.io/api/XAU/INR",
  //     requestOptions
  //   );
  //   console.log(res.data);
  // }, []);
  // fetch("https://www.goldapi.io/api/XAU/INR", requestOptions)
  //   .then((response) => response.text())
  //   .then((result) => console.log(result));
  // .catch((error) => console.log("error", error));

  const handelLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: null,
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  // useEffect(async () => {
  //   let res = await axios.get(
  //     `https://api.metalpriceapi.com/v1/latest?api_key=9c3e528061699dcb080c7cb54c4dd0e5&base=EUR&currencies=USD,XAU,XAG`
  //   );
  //   console.log(res.data);
  // }, []);

  const blinkingStyles = {
    color: "goldenrod",
    fontWeight: "bold",
    animation: "blink 1s infinite",
    "@keyframes blink": {
      "0%": { opacity: 1 },
      "50%": { opacity: 0 },
      "100%": { opacity: 1 },
    },
  };
  const boldSilverStyles = {
    fontWeight: "bold",
    color: "blue",
    animation: "blink 1s infinite",
    "@keyframes blink": {
      "0%": { opacity: 1 },
      "50%": { opacity: 0 },
      "100%": { opacity: 1 },
    },
  };
  return (
    <div>
      {/* <Modal size="lg" isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalBody>
          <Login />
        </ModalBody>
      </Modal>
      {!fetched && (
        <Modal size="lg" isOpen={modal1} toggle={() => setModal1(!modal1)}>
          <ModalBody>
            <Register sf={setFetched} />
          </ModalBody>
        </Modal>
      )} */}

      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid ">
          <h3 className="navbar-toggler text-dark no-border text-uppercase fw-bold">
            <Link to="/" className="text-dark">
              <img
                src="/Images/logo.png"
                style={{ width: "35px", marginRight: "5px" }}
              />
              Shreeji Jewellers
            </Link>
          </h3>
          <button
            className="navbar-toggler "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon " />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
              <img
                src="./favicon.png"
                style={{ width: "35px", marginRight: "5px" }}
              />
              Shreeji Jewellers
              {/* {rate}
               */}
            </Link>{" "}
            {/* <li className="nav-item ">
              <p>Gold:{goldValue}</p>
              <p>silver:{silverValue}</p>
            </li> */}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li
                className="nav-item dropdown nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
              >
                Live Rate
                <ul className="dropdown-menu">
                  <li className="nav-item p-2" style={blinkingStyles}>
                    Gold:{goldValue}
                  </li>
                  <li className="nav-item p-2 " style={boldSilverStyles}>
                    silver:{silverValue}
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                {searchBtn ? (
                  <div className="mt-1 mx-3">
                    <Searchinput />
                  </div>
                ) : (
                  <div
                    className="mt-2 mx-3 d-flex "
                    style={{ cursor: "pointer" }}
                    onClick={() => setSerchBtn(true)}
                  >
                    <BiSearchAlt />
                    <p className="h6 mx-1"> Search</p>
                  </div>
                )}
              </li>
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              {/* <li className="nav-item">
                <NavLink
                  to="/catogery"
                  className="nav-link dropdown-toggle"
                ></NavLink>
              </li> */}
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/Register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/Login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: "none" }}
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashbord/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                          {/* {rate.silver} */}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handelLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item">
                <Badge count={cart?.length} showZero>
                  <NavLink to="/cart" className="nav-link">
                    Cart{}
                  </NavLink>
                </Badge>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
