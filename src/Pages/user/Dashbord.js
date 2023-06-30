import React from "react";
import Layout from "../../Components/Layout/Layout";
import UserMenu from "../../Components/Layout/UserMenu";
import { useAuth } from "../../Context/Auth";

const Dashbord = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashbord - Ecommerce dashbord"}>
      <div className="container-flui p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-2">
              <h1>Name : {auth?.user?.name}</h1>
              <h1>Email : {auth?.user?.email}</h1>
              <h1>Address : {auth?.user?.address}</h1>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashbord;
