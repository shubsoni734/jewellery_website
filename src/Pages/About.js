import React from "react";
import Layout from "../Components/Layout/Layout";
import { FiPhoneCall } from "react-icons/fi";
import { BiSupport, BiMap } from "react-icons/bi";

const About = () => {
  return (
    <Layout title={"About Shreeji"}>
      <div className="row contactus">
        <div className="col-md-6">
          <img
            src="https://github.com/techinfo-youtube/ecommerce-app-2023/blob/15-admin-orders-css/client/public/images/about.jpeg?raw=true"
            alt="Contact us"
            style={{
              width: "100%",
            }}
          />
        </div>
        <div className="col-md-4">
          {/* <h1 className="bg-dark text-light text-center p-2">CONTACT US</h1> */}
          <p className="justify-contant mt-2">
            Shree ji jewellers was founded in 1992 with the idea that the gold
            and silver business was ready for innovation. We the industry with a
            disruptive business model, making it possible to shop for
            extraordinary, high-quality gold jewllery at a great value. And we
            didn't stop there. We also firmly believed that our customers
            deserved more choices, straightforward information and legendary
            service. We felt strongly about building a team of passionate,
            non-commissioned gold jewellery and jewelry experts who put the
            customer first. (We're thrilled to share that a few of our customers
            have even invited our experts to their weddings!) As the leader in
            handcrafted engagement rings and beautiful fine jewelry, we're
            constantly innovating and looking for new ways to help you discover
            and design the perfect pieces for every occasion. We strive to be
            your jeweler for life.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
