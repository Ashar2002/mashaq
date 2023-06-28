import { useStateContext } from "@/context/StateContext";
import { urlFor } from "@/lib/client";
import getStripe from "@/lib/getStripe";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { toast } from "react-hot-toast";
import {
  AiOutlineLeft,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShopping,
} from "react-icons/ai";

import { TiDeleteOutline } from "react-icons/ti";

const Cart = () => {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    toggleCartItemQuantity,
    setShowCart,
    onRemove,
  } = useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });

    if (response.statusCode === 500) return;

    const data = await response.json();
    toast.loading("Redirecting...");
    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items"> ({totalQuantities} items) </span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <div
              style={{
                display: "flex",

                justifyContent: "center",
              }}
            >
              <AiOutlineShopping size={150} />
            </div>
            <h3>Your shopping bag is empty</h3>
            <Link href={"/"}>
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems?.map((item) => (
              <div className="product" key={item._id}>
                <Image
                  style={{ objectFit: "contain" }}
                  className="cart-product-image"
                  width={1000}
                  height={1000}
                  src={urlFor(item?.image[0]).url()}
                  alt=""
                />
                <div className="item-desc">
                  <div style={{ fontWeight: "700" }} className="flex top">
                    <h5>{item?.name}</h5>
                    <h4>{item?.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span
                          onClick={() =>
                            toggleCartItemQuantity(item._id, "dec")
                          }
                          className="minus"
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="num"> {item.quantity} </span>
                        <span
                          onClick={() =>
                            toggleCartItemQuantity(item._id, "inc")
                          }
                          className="plus"
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => onRemove(item)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div style={{ fontWeight: "700" }} className="total">
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button
                onClick={handleCheckout}
                style={{ fontWeight: "600" }}
                type="button"
                className="btn"
              >
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
