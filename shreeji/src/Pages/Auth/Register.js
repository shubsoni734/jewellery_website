import React, { useState } from "react";
import Layout from "../../Components/Layout/Layout";
import "../../Styles/Auth/AuthStyle.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = ({ sf }) => {
  const history = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (
        name == "" ||
        email == "" ||
        password == "" ||
        phone == "" ||
        address == ""
      ) {
        toast.error("every fild is require");
      }
      axios
        .post("http://127.0.0.1:8080/api/v1/auth/register", {
          name,
          email,
          password,
          phone,
          address,
        })
        .then((res) => {
          if (res.data.message == "User register Succesfully") {
            // toast.success("Register Sucessfuly");
            console.log("data insert success");
            toast.success("User Register Sucessfully");
            history("/login");
          } else if (res.data.message == "user already register") {
            console.log("user alredy register");
            toast.error("You Already Register!");
            setName("");
            setEmail("");
            setPassword("");
            setPhone("");
            setAddress("");
          } else if (res.data.message == "error in login") {
            toast.error("Server Problem !");
          }
        });
    } catch (e) {
      console.log(e);
      toast.error("something went wrong!");
    }
  };
  return (
    <div>
      <Layout>
        <div className="form-container" style={{ minHeight: "78vh" }}>
          <form>
            <h1 className="title">Register</h1>
            <div className="mb-3">
              {/* <label htmlFor="exampleInputName" className="form-label">
                Name
              </label> */}
              <input
                type="text"
                className="form-control"
                id="exampleInputName"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoFocus
              />
            </div>
            <div className="mb-3">
              {/* <label htmlFor="exampleInputEmail" className="form-label">
                Email
              </label> */}
              <input
                type="Email"
                className="form-control"
                id="exampleInputEmail"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              {/* <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label> */}
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3 inputNumber">
              {/* <label htmlFor="exampleInputNumber" className="form-label">
                Phone
              </label> */}
              <input
                type="number"
                className="form-control"
                id="exampleInputNumber"
                placeholder="Enter Phone No."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              {/* <label htmlFor="exampleInputAddress" className="form-label">
                Address
              </label> */}
              <input
                type="text"
                className="form-control"
                id="exampleInputAddress"
                placeholder="Enter Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputMessage" className="form-label">
                {message}
              </label>
            </div>
            <button onClick={handleSubmit} className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </Layout>
    </div>
  );
};

export default Register;
