import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "../../Styles/NavBarstyle.css";
import { GiCutDiamond } from "react-icons/gi";
import { BiSearchAlt } from "react-icons/bi";
import { useAuth } from "../../Context/Auth";
import toast from "react-hot-toast";
import Searchinput from "../Form/Searchinput";

// import { Modal, ModalBody, ModalHeader } from "reactstrap";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [searchBtn, setSerchBtn] = useState(false);
  // const [modal, setModal] = useState(false);
  // const [modal1, setModal1] = useState(false);

  const handelLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: null,
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
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
              <GiCutDiamond />
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
              <GiCutDiamond />
              Shreeji Jewellers
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
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
              <li className="nav-item">
                <NavLink to="/catogery" className="nav-link">
                  Catogery
                </NavLink>
              </li>
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
                <NavLink to="/cart" className="nav-link">
                  Cart (0)
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
