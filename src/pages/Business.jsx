import { useEffect } from "react";
import { motion } from "framer-motion";
import CategoryGrid from "../components/CategoryGrid.jsx";
import { businessCategories } from "../data/categories.js";
import "../styles/EventPage.css";

const EASE = [0.22, 1, 0.36, 1];

export default function Business() {
  useEffect(() => {
    document.title = "Business & Economics — SciBiz";
  }, []);

  return (
    <main className="event-page">
      <header className="event-hero">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, ease: EASE }}
        >
          Business & Economics
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, delay: 0.06, ease: EASE }}
        >
          Browse the business and economics categories. Open a category to
          read its description and rules.
        </motion.p>
      </header>
      <CategoryGrid categories={businessCategories} />
    </main>
  );
}
