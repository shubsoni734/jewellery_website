import React, { useState } from "react";
import Layout from "../../Components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const history = useNavigate();
  const [email, setEmail] = useState();
  const [answer, setAnswer] = useState();
  const [newPassword, setNewPassword] = useState();
  const [show, setShow] = useState("password");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (email === "" || answer === "" || newPassword === "") {
        toast.error("every field is require");
      } else
        axios
          .post("http://127.0.0.1:8080/api/v1/auth/forgot-password", {
            email,
            answer,
            newPassword,
          })
          .then((res) => {
            if (res.data.success === true) {
              toast.success(res.data.message);
              history("/login");
            } else {
              toast.error(res.data.message);
            }
          });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Layout>
        <div className="form-container" style={{ minHeight: "78vh" }}>
          <form>
            <h1 style={{ fontSize: "30px" }}>Forgot Password</h1>
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
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Enter security Answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              {/* <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label> */}
              <input
                type={show}
                className="form-control"
                id="exampleInputPassword1"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                onMouseEnter={() => setShow("test")}
                onMouseOut={() => setShow("password")}
                required
              />
              {/* <input type="button" onClick={passwordShow}>
                hide
              </input> */}
            </div>
            {/* <div className="mb-3">
              <label htmlFor="exampleInputMessage" className="form-label">
                {message}
              </label>
            </div> */}
            <button onClick={handleSubmit} className="btn btn-primary ">
              Submit
            </button>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default ForgotPassword;
