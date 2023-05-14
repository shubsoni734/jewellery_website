import React from "react";
import Layout from "../Components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Shreeji - Policys"}>
      <div className="row contactus">
        <div className="col-md-6">
          <img
            src="https://github.com/techinfo-youtube/ecommerce-app-2023/blob/15-admin-orders-css/client/public/images/contactus.jpeg?raw=true"
            alt="Contact us"
            style={{
              width: "100%",
            }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="text-center p-2">Privacy Policy </h1>
          <p className="justify-contant mt-2">Privacy Policy</p>
          <p className="justify-contant mt-2">Privacy Policy</p>
          <p className="justify-contant mt-2">Privacy Policy</p>
          <p className="justify-contant mt-2">Privacy Policy</p>
          <p className="justify-contant mt-2">Privacy Policy</p>
          <p className="justify-contant mt-2">Privacy Policy</p>
          <p className="justify-contant mt-2">Privacy Policy</p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
