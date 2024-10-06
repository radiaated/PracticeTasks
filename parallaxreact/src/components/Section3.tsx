import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import hill1 from "../assets/hill/hill1.png";
import hill2 from "../assets/hill/hill2.png";
import hill3 from "../assets/hill/hill3.png";
import hill4 from "../assets/hill/hill4.png";
import hill5 from "../assets/hill/hill5.png";
import leaf from "../assets/hill/leaf.png";
import plant from "../assets/hill/plant.png";
import tree from "../assets/hill/tree.png";

import { motion, useScroll, useTransform } from "framer-motion";

const Section3 = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const hill1Y = useTransform(scrollYProgress, [0, 1], ["0%", "-45%"]);
  const hill2Y = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
  const hill3Y = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const hill45X = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  const bottomY = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <>
      <div
        style={{
          height: "200vh",
          width: "100vw",
          position: "relative",
          backgroundColor: "#fcfcfc",
        }}
        ref={ref}
      >
        <div
          style={{
            height: "100vh",
            width: "100%",
            position: "fixed",
          }}
        >
          <motion.div
            style={{
              position: "absolute",
              height: "100vh",
              width: "100%",
              y: hill1Y,
            }}
          >
            <img src={hill1} alt="" style={{ height: "100%", width: "100%" }} />
          </motion.div>
          <motion.div
            style={{
              position: "absolute",
              height: "100vh",
              width: "100%",
              y: hill2Y,
            }}
          >
            <img src={hill2} alt="" style={{ height: "100%", width: "100%" }} />
          </motion.div>
          <motion.div
            style={{
              position: "absolute",
              height: "100vh",
              width: "100%",
              y: hill3Y,
            }}
          >
            <img src={hill3} alt="" style={{ height: "100%", width: "100%" }} />
          </motion.div>
          <motion.div
            style={{
              position: "absolute",
              height: "100vh",
              width: "100%",
              left: hill45X,
            }}
          >
            <img src={hill4} alt="" style={{ height: "100%", width: "100%" }} />
          </motion.div>
          <motion.div
            style={{
              position: "absolute",
              height: "100vh",
              width: "100%",
              right: hill45X,
            }}
          >
            <img src={hill5} alt="" style={{ height: "100%", width: "100%" }} />
          </motion.div>
          <motion.div
            style={{
              position: "absolute",
              height: "100vh",
              width: "100%",
              y: bottomY,
            }}
          >
            <img src={tree} alt="" style={{ height: "100%", width: "100%" }} />
          </motion.div>
          <motion.div
            style={{
              position: "absolute",
              height: "100vh",
              width: "100%",
              y: bottomY,
            }}
          >
            <img src={plant} alt="" style={{ height: "100%", width: "100%" }} />
          </motion.div>
          <motion.div
            style={{
              position: "absolute",
              height: "100vh",
              width: "100%",
              y: bottomY,
            }}
          >
            <img src={leaf} alt="" style={{ height: "100%", width: "100%" }} />
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#05332a",
                marginTop: "-5px",
              }}
            ></div>
          </motion.div>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "#05332a",
          width: "100vw",
          height: "100vh",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100vh",
            top: "0",
            position: "sticky",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: "5rem", color: "white" }}>Hello world!</div>
        </div>
      </div>
    </>
  );
};

export default Section3;
