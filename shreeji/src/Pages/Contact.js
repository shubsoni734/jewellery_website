import React from "react";
import Layout from "../Components/Layout/Layout";
import { FiPhoneCall } from "react-icons/fi";
import { BiSupport, BiMap } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title={"ContactUs - Shreeji"}>
      <div className="row contactus">
        <div className="col-md-6">
          <img
            src="https://th.bing.com/th/id/OIP.nvvUR1XnO0Z_R2mI6uu0MgAAAA"
            alt="Contact us"
            style={{
              width: "100%",
            }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark text-light text-center p-2">CONTACT US</h1>
          <p className="justify-contant mt-2">
            {" "}
            any query and info about prodduct feel free to call any time 24x7
            available
          </p>
          <p className="mt-3">
            <FiPhoneCall /> : +91 99291-87318
          </p>
          <p className="mt-3">
            <BiSupport /> : +91 95094-92917
          </p>
          <p className="mt-3">
            {" "}
            <BiMap /> : Dev Narayan Mandir Road Near Nahar Sab Ka Kua Pur Road
            Azad Nagar Bhilwara(Raj.) 311001
          </p>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7211.799740046856!2d74.61770159357913!3d25.341140799999987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3968c2383e7c5fad%3A0x36753905e3cdb0f!2sShree%20Ji%20Jeweller's%20Gold%20%26%20Silver%20Ornaments!5e0!3m2!1sen!2sin!4v1683660069348!5m2!1sen!2sin"
            width={500}
            height={200}
            style={{ border: 0, margin: "10px" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
