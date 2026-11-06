import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

const EASE = [0.22, 1, 0.36, 1];

export default function ExpandedCategory({ category, onSelect }) {
  const reduce = useReducedMotion() === true;
  const duration = reduce ? 0.01 : 0.34;
  const [showDetails, setShowDetails] = useState(false);
  const hasDetails = Array.isArray(category.details) && category.details.length > 0;

  return (
    <motion.div
      className="expanded"
      role="region"
      aria-label={category.name}
      data-expanded={category.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0.01 : 0.22, ease: EASE }}
      data-detail-count={hasDetails ? category.details.length : 0}
      data-details-open={showDetails}
    >
      <motion.button
      layoutId={`category-${category.id}`}
        type="button"
        className="detail-card detail-center"
        style={{ zIndex: 2 }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration, ease: EASE }}
        onClick={() => onSelect(category.id)}
        aria-expanded="true"
        aria-label={`Close ${category.name}`}
      >
        <span className="category-name">{category.name}</span>
        <span className="detail-intro">{category.introduction}</span>
      </motion.button>

      <motion.button
      layout
  type="button"
  className="detail-card detail-description"
  style={{ zIndex: 3, cursor: hasDetails ? "pointer" : "default", textAlign: "left" }}
  initial={{ opacity: 0, x: "100%" }}
animate={{ opacity: 1, x: 0 }}
exit={{ opacity: 0 }}
transition={{ duration, ease: EASE, delay: reduce ? 0 : 0.05 }}
  disabled={!hasDetails}
  onClick={() => setShowDetails((prev) => !prev)}
  aria-expanded={showDetails}
      >
        <h2 className="detail-label">Description</h2>
        {hasDetails ? (
  <>
    <h2 className="detail-label">{category.details[0].title}</h2>
    <p>{category.details[0].content}</p>
  </>
) : (
  <p>{category.description}</p>
)}
        {hasDetails && (
  <span className="detail-more">
    {showDetails ? "Close additional details ↑" : "Click for more details ↓"}
  </span>
)}
        </motion.button>

      <motion.article
        className="detail-card detail-rules"
        style={{ zIndex: 1 }}
        initial={{ opacity: 0, x: "-100%" }}
animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration, ease: EASE, delay: reduce ? 0 : 0.08 }}
      >
        <div className="detail-block">
          <h2 className="detail-label">Rules</h2>
          <p>{category.rules}</p>
        </div>
        {category.additional ? (
          <div className="detail-block">
            <h2 className="detail-label">
  {category.id === "science-2"
    ? "Programming Knowledge:"
    : "Additional information"}
</h2>
            <ul>
  {category.additional.map((item, index) => (
    <li key={index}>{item}</li>
  ))}
</ul>
          </div>
        ) : null}
      </motion.article>

      {/* extra details */}

      {hasDetails && showDetails && (
  <div className="extra-details">
    {category.details.slice(1).map((detail, index) => (
      <motion.article
        key={`${category.id}-detail-${index}`}
        className="detail-card extra-detail-card"
        style={{ zIndex: 2, position: "relative" }}
        initial={{ opacity: 0, x: -180, scale: 0.92 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: -140, scale: 0.94 }}
        transition={{
          duration: reduce ? 0.01 : 0.65,
          ease: EASE,
          delay: reduce ? 0 : 0.12 + index * 0.16,
        }}
      >
        <h2 className="detail-label">{detail.title}</h2>
        <p>{detail.content}</p>
      </motion.article>
    ))}
  </div>
)}
    </motion.div>
  );
}
