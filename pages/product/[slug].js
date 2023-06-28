import { Product } from "@/components";
import { useStateContext } from "@/context/StateContext";
import { client, urlFor } from "@/lib/client";
import Image from "next/image";
import React, { useState } from "react";
import {
  AiFillStar,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineStar,
} from "react-icons/ai";

const productDetail = ({ product, products }) => {
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);
  const { incQty, setShowCart, decQty, qty, onAdd } = useStateContext();

  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
  };

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <Image
              alt=""
              src={urlFor(image[index] ? image[index] : image[0]).url()}
              width={400}
              height={400}
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <Image
                key={i}
                alt=""
                src={urlFor(item).url()}
                width={100}
                height={100}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h2>{name}</h2>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3 style={{ fontWeight: "700", fontSize: "20px" }}>Quantity:</h3>
            <p className="quantity-desc">
              <span onClick={decQty} className="minus">
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span onClick={incQty} className="plus">
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              onClick={() => onAdd(product, qty)}
              type="button"
              className="add-to-cart"
            >
              Add to Cart
            </button>
            <button onClick={handleBuyNow} type="button" className="buy-now">
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products?.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
      slug {
         current
      }
   }
   `;
  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = `*[_type == "product"]`;

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  if (!product) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      product,
      products,
    },
  };
};

export default productDetail;
