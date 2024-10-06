import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import background from "../assets/background.png";
import gateLeft from "../assets/gate-left.png";
import gateRight from "../assets/gate-right.png";
import grass from "../assets/grass.png";
import treeLeft from "../assets/tree-left.png";
import treeRight from "../assets/tree-right.png";
import pumpkin from "../assets/pumpkin.png";

import { motion, useScroll, useTransform } from "framer-motion";

const Section2 = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const treeScale = useTransform(scrollYProgress, [0, 1], ["1", "2.5"]);
  const gateX = useTransform(scrollYProgress, [0, 1], ["-15%", "0%"]);
  const gateY = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
  const gateScale = useTransform(scrollYProgress, [0, 1], ["1", "1.5"]);
  const grassY = useTransform(scrollYProgress, [0, 1], ["-5%", "-100%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const textLS = useTransform(scrollYProgress, [0, 1], ["0px", "100px"]);

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
          width: "100%",

          background: "blue",
          position: "relative",
        }}
        ref={ref}
      >
        <div
          style={{
            height: "100vh",
            width: "100%",
            position: "fixed",

            background: `url(${background})`,
          }}
        >
          <motion.div
            style={{
              position: "absolute",
              height: "100vh",
              left: "0",
              scale: treeScale,
            }}
          >
            <img src={treeLeft} alt="" style={{ height: "100%" }} />
          </motion.div>
          <motion.div
            style={{
              position: "absolute",
              height: "100vh",
              right: "0",
              scale: treeScale,
            }}
          >
            <img src={treeRight} alt="" style={{ height: "100%" }} />
          </motion.div>
          <motion.div
            style={{
              position: "absolute",
              height: "100vh",
              width: "100%",
              fontSize: "5rem",
              color: "black",
              textAlign: "center",
              y: textY,
              letterSpacing: textLS,
              fontWeight: "800",
            }}
          >
            Spooky
          </motion.div>
          <motion.div
            style={{
              position: "absolute",
              left: gateX,
              height: "100vh",
              scale: gateScale,
              y: gateY,
            }}
          >
            <img src={gateLeft} alt="" style={{ height: "100%" }} />
          </motion.div>
          <motion.div
            style={{
              position: "absolute",
              right: gateX,
              height: "100vh",
              scale: gateScale,
              y: gateY,
            }}
          >
            <img src={gateRight} alt="" style={{ height: "100%" }} />
          </motion.div>
          <motion.div
            style={{
              position: "sticky",
              height: "100vh",
              y: grassY,
            }}
          >
            <div>
              <img
                src={grass}
                alt=""
                style={{ height: "100%", width: "100%", marginBottom: "-5px" }}
              />
            </div>
            <div
              style={{
                height: "100%",
                width: "100%",
                backgroundColor: "#030913",
                marginTop: "0",
              }}
            ></div>
          </motion.div>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "#030913",
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
          <div style={{ height: "50vh", textAlign: "center" }}>
            <img src={pumpkin} alt="" style={{ height: "100%" }} />
          </div>
          <div style={{ fontSize: "5rem", color: "white" }}>
            Happy Halloween!
          </div>
        </div>
      </div>
    </>
  );
};

export default Section2;
