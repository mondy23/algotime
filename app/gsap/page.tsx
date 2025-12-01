"use client";

import { useEffect } from "react";
import gsap from "gsap";

const Page = () => {
  useEffect(() => {
    gsap.to(".box", { x: 200, duration: 1 });
  }, []);

  return (
    <div>
      <div className="box green" style={{ width: 100, height: 100, backgroundColor: "green" }}></div>
    </div>
  );
};

export default Page;
