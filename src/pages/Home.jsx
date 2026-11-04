
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/Home.css";  
import useScrollReveal from "../hooks/useScrollReveal";

const EASE = [0.22, 1, 0.36, 1];

const title = "SciBiz";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.075,
    },
  },
};

const letterVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    rotateX: -45,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: EASE,
    },
  },
};

export default function Home() {
  useScrollReveal();

  useEffect(() => {
    document.title = "SciBiz";
  }, []);

  return (
    <main className="home-page">
      <div className="home-hero" data-reveal>

        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ display: "flex", perspective: 600 }}
        >
          {title.split("").map((letter, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              style={{ display: "inline-block" }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.65,
            ease: EASE,
          }}
        >
          SciBiz is an inter-school science and business competition.
          Explore the categories in each field, then register to take part.
        </motion.p>

        <motion.div
          className="home-actions"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.85,
            ease: EASE,
          }}
        >
          <motion.div
            whileHover={{ scale: 1.045, y: -4 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            <Link className="btn btn-solid" to="/science">
              Science
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.045, y: -4 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            <Link className="btn btn-ghost" to="/business">
              Business
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </main>
  );
}
