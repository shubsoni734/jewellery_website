import React, { useState } from "react";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import { useAuth } from "../../Context/Auth";
import toast from "react-hot-toast";
import axios from "axios";

const AdminDashbord = () => {
  const [auth, setAuth] = useAuth();
  const [gold, setGold] = useState();
  const [silver, setSilver] = useState();
  const handleUpdate = (e) => {
    e.preventDefault();
    try {
      if (gold === "" || silver === "") {
        toast.error("Enter Gold and Silver Rate");
      }
      axios
        .post("http://127.0.0.1:8080/api/v1/auth/liverate", { gold, silver })
        .then((res) => {
          if (res.data.success === true) {
            console.log("work");
            toast.success("Rate Update Success");
            setGold("");
            setSilver("");
          } else {
            toast.error(res.data.message);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-2">
              <h1>Admin Name : {auth?.user?.name}</h1>
              <h1>Admin Email : {auth?.user?.email}</h1>
              <h1>Admin Contact : {auth?.user?.phone}</h1>
            </div>
            <form onSubmit={handleUpdate}>
              <div className="card w-75 p-2 my-2">
                <h1 className="text-secondary">Update Gold & Silver Price</h1>
                <h2 className="m-2">
                  Gold Price :{" "}
                  <input
                    type="number"
                    className="p-1"
                    value={gold}
                    onChange={(e) => setGold(e.target.value)}
                  />
                </h2>
                <h2 className="m-1">
                  Silver Price :{" "}
                  <input
                    className="p-1"
                    type="number"
                    value={silver}
                    onChange={(e) => setSilver(e.target.value)}
                  />
                </h2>
              </div>
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashbord;
