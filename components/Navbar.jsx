import Link from "next/link";
import React from "react";
import { AiOutlineShopping } from "react-icons/ai";
import Cart from "./Cart";
import { useStateContext } from "@/context/StateContext";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className="container ml-auto text-right mr-10 pb-10">
      {/* <p>
        <Link href="/">BEST Headphones</Link>
      </p> */}

      <button
        onClick={() => setShowCart(true)}
        type="button"
        className="cart-icon"
      >
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
