import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
export default function ScroolBtn() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };
  const handleBtn = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <AnimatePresence>
      {scrollPosition >= 950 ? (
        <motion.button
          className="up_btn"
          onClick={handleBtn}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, scale: [0.3, 0.6, 0.9, 1.5, 1] },
          }}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 1, scale: [1, 0.9, 0.6, 0.3, 0] }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          UP
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
