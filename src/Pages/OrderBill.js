import React from "react";
import { useAuth } from "../Context/Auth";
import { useCart } from "../Context/Cart";
import { useBill } from "../Context/OrderDetail";
import { useNavigate } from "react-router-dom";

const OrderBill = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [bill, setBill] = useBill();
  const handleInvoice = () => {
    navigate("/dashbord/user/orders");
  };
  return (
    <div>
      <button
        type="button"
        className="m-2 btn btn-info"
        onClick={handleInvoice}
      >
        Download Invoice
      </button>
      <div className="container">
        <div className="text-center m-2 fs-2">Invoice Detils</div>
        <div className="border border-5 border-dark" />
        <div className="m-2 d-flex flex-row justify-content-between ">
          <div className="fs-3">
            <img
              src="../Images/Logo.Png"
              className="m-2"
              height="35px"
              width={"35px"}
            />
            Shreeji Jewellers
          </div>
          <p className="">
            Dev Narayan Mandir Road Near Nahar
            <br /> Sab Ka Kua Pur Road Azad Nagar
            <br /> Bhilwara(Raj.) 311001
            <br />
            +91 9509492917
          </p>
        </div>
        <div className="border border-1 border-dark" />
        <div>
          <h3>Order Id: {bill?.id}</h3>
          <h3>Billing Name :{auth.user.name}</h3>
          <h4>Phone: {auth.user.phone}</h4>
          <h5>Address : {auth.user.address}</h5>
        </div>
        <div className="border border-1 border-dark" />
      </div>
    </div>
  );
};

export default OrderBill;
