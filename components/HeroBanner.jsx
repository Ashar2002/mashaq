import { urlFor } from "@/lib/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HeroBanner = ({ heroBanner }) => {
  return (
    <div className="hero-banner-container">
      <div>
        {/* <p className="beats-solo">{heroBanner.smallText}</p>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText1}</h1> */}
        {/* <Image
          className="hero-banner-image object-contain"
          src={urlFor(heroBanner.image).url()}
          // src="/MASHAQ_BANNER.JPG"
          alt="headphones"
          width={1000}
          height={1000}
        /> */}

        {/* <div>
          <Link href={`/product/${heroBanner.product}`}>
            <button type="button">{heroBanner.buttonText}</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>{heroBanner.desc}</p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default HeroBanner;
