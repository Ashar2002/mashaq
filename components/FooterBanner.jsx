import { urlFor } from "@/lib/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const FooterBanner = ({
  footerBanner: {
    discount,
    largeText1,
    largeText2,
    saleTime,
    smallText,
    midText,
    product,
    buttonText,
    image,
    desc,
  },
}) => {
  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>
        <div className="right">
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href={`/product/${product}`}>
            <button type="button">{buttonText}</button>
          </Link>
        </div>
        <Image
          alt=""
          src={urlFor(image).url()}
          width={480}
          height={480}
          style={{ objectFit: "contain" }}
          className="footer-banner-image"
        />
      </div>
    </div>
  );
};

export default FooterBanner;
