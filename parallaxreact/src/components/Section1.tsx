import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";

const Section1 = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const topScale = useTransform(scrollYProgress, [0, 1], [1, 0.7]);
  const topRotate = useTransform(scrollYProgress, [0, 1], [0, -10]);
  const bottomScale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const bottomRotate = useTransform(scrollYProgress, [0, 1], [-10, -0]);

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
        ref={ref}
        style={{
          height: "200vh",
          position: "relative",
        }}
      >
        <motion.div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "8rem",
            height: "100vh",
            position: "sticky",
            top: "0",
            backgroundColor: "cadetblue",
            paddingBottom: "10vh",
            scale: topScale,
            rotate: topRotate,
          }}
        >
          Hello
        </motion.div>
        <motion.div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "8rem",
            width: "100%",
            height: "100vh",
            position: "relative",
            backgroundColor: "blueviolet",
            // scale,
            // rotate,
          }}
        >
          World!
        </motion.div>
      </div>
    </>
  );
};

export default Section1;
