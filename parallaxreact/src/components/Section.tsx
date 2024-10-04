import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Section = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);

  // console.log(backgroundY);
  // console.log(textY);

  useEffect(() => {
    let i = setInterval(() => {
      console.log(backgroundY);
      console.log(textY);
    }, 5000);

    return () => {
      clearInterval(i);
    };
  }, []);

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "90vh",
          margin: "0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          position: "relative",
        }}
        ref={ref}
      >
        <div
          style={{
            position: "absolute",
            bottom: "0",
            backgroundImage: `url(/image-bottom.png)`,
            backgroundSize: "cover",
            backgroundPosition: "bottom",
            width: "100%",
            height: "100%",
            zIndex: 2,
          }}
        ></div>
        <motion.div
          style={{
            zIndex: 1,

            color: "white",
            fontSize: "7rem",
            y: textY,
          }}
        >
          Hello world!
        </motion.div>
        <motion.div
          style={{
            position: "absolute",
            bottom: 1,
            backgroundImage: `url(/image-full.png)`,
            backgroundSize: "cover",
            backgroundPosition: "bottom",
            width: "100%",
            height: "100%",
            y: backgroundY,
            zIndex: 0,
          }}
        ></motion.div>
      </div>
      <div
        style={{
          width: "100%",
          height: "100vh",
          backgroundColor: "#06141D",
        }}
      ></div>
    </>
  );
};

export default Section;
