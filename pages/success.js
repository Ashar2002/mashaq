import { useStateContext } from "@/context/StateContext";
import { runFireworks } from "@/lib/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsBagCheckFill } from "react-icons/bs";

const success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireworks();
  }, []);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Check your email inbox for the receipt.</p>
        <p className="description">
          If you have any question, please email{" "}
          <a href="mailto:order@shopping.com">order@shopping.com</a>
        </p>
        <Link href="/">
          <button type="button" className="btn" style={{ padding: "8px 30px" }}>
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default success;
